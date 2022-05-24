const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const { describe, it } = require('mocha')
const { getAllTeams, getTeamByID, addTeam } = require('../../controllers/team')
const { teams } = require('../../models/index')
const { teamsList, teamOne, teamTwo } = require('../mocks/teams')

chai.use(sinonChai)
const { expect } = chai

describe('testing the team controller', () => {
  describe('getAllTeams', () => {
    it('gets all teams from the database and responds with a list of all the teams', async () => {
      const stubbedFindAll = sinon.stub(teams, 'findAll').returns(teamsList)
      const stubbedSend = sinon.stub()
      const stubbedStatus = sinon.stub().returns({ send: stubbedSend })
      const response = { send: stubbedSend, status: stubbedStatus } // altering the response object

      await getAllTeams({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(teamsList)
    })
  })
  describe('getTeamByID', () => {
    it('gets a team from the database based on an Id', async () => {
      const request = { params: { id: 34 } }
      const stubbedSend = sinon.stub()
      const stubbedStatus = sinon.stub().returns({ send: stubbedSend })
      const response = { send: stubbedSend, status: stubbedStatus }
      const stubbedFindOne = sinon.stub(teams, 'findOne').returns(teamOne)

      await getTeamByID(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { id: 34 } })
      expect(stubbedFindOne).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(teamOne)
    })
  })

  describe('addTeam', () => {
    it('adds a new team to the database', async () => {
      const request = { body: teamTwo }
      const stubbedSend = sinon.stub()
      const stubbedStatus = sinon.stub().returns({ send: stubbedSend })
      const response = { status: stubbedStatus }
      const stubbedCreate = sinon.stub(teams, 'create').returns(teamTwo)

      await addTeam(request, response)

      expect(stubbedCreate).to.have.been.calledWith(teamTwo)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedSend).to.have.been.calledWith(teamTwo)
    })
  })
})
