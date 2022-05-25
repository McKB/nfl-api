const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const { describe, it, beforeEach, afterEach } = require('mocha')
const { getAllTeams, getTeamByID, addTeam } = require('../../controllers/team')
const { teams } = require('../../models/index')
const { teamsList, teamOne, teamTwo, badTeam } = require('../mocks/teams')

chai.use(sinonChai)
const { expect } = chai

describe('testing the team controller', () => {
  let sandbox = sinon.createSandbox()
  let stubbedFindOne = sandbox.stub(teams, 'findOne')
  let stubbedFindAll = sandbox.stub(teams, 'findAll')
  let stubbedCreate = sinon.stub(teams, 'create')
  let stubbedSend = sandbox.stub()
  let stubbedStatus = sandbox.stub()
  let stubbedSendStatus = sandbox.stub()
  let response = {
    send: stubbedSend,
    sendStatus: stubbedSendStatus,
    status: stubbedStatus,
  }

  beforeEach(() => {
    stubbedStatus.returns({ send: stubbedSend })
  })

  afterEach(() => {
    sandbox.reset()
  })

  describe('getAllTeams', () => {
    // happy path
    it('gets all teams from the database and responds with a list of all the teams', async () => {
      stubbedFindAll.returns(teamsList)

      await getAllTeams({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(teamsList)
    })
    // sad path
    it('returns status 500 when the database goes down, throws error', async () => {
      stubbedFindAll.throws('Error')

      await getAllTeams({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSendStatus).to.have.been.calledWith(500)
    })
  })

  describe('getTeamByID', () => {
    // happy path
    it('gets a team from the database based on an Id', async () => {
      const request = { params: { id: 34 } }

      stubbedFindOne.returns(teamOne)

      await getTeamByID(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { id: 34 } })
      expect(stubbedFindOne).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(teamOne)
    })
    // sad path one
    it('returns 404 when no team is found in the database', async () => {
      const request = { params: { id: 999 } }

      stubbedFindOne.returns(null)

      await getTeamByID(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { id: 999 } })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })
    // sad path two
    it('returns 500 when the database is down', async () => {
      const request = { params: { id: 34 } }

      stubbedFindOne.throws('Error')

      await getTeamByID(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { id: 34 } })
      expect(stubbedSendStatus).to.have.been.calledWith(500)
    })
  })

  describe('addTeam', () => {
    // happy path
    it('adds a new team to the database', async () => {
      const request = { body: teamTwo }

      stubbedCreate.returns(teamTwo)

      await addTeam(request, response)

      expect(stubbedCreate).to.have.been.calledWith(teamTwo)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedSend).to.have.been.calledWith(teamTwo)
    })
    // sad path one
    it('sends 400 status if not all requirements are met', async () => {
      const request = { body: badTeam }

      await addTeam(request, response)

      expect(stubbedStatus).to.have.been.calledWith(400)
      // eslint-disable-next-line max-len
      expect(stubbedSend).to.have.been.calledWith('the following fields are required: location, mascot, abbreviation, conference, division')
    })
    // sad path two
    it('sends 500 status if database errors out', async () => {
      const request = { body: teamTwo }

      stubbedCreate.throws('Error')

      await addTeam(request, response)

      expect(stubbedCreate).to.be.calledWith(teamTwo)
      expect(stubbedSendStatus).to.have.been.calledWith(500)
    })
  })
})
