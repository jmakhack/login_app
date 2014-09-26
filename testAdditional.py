import unittest
import os
import testLib
        
class TestAddUser(testLib.RestTestCase):

    def assertResponse(self, respData, count = 1, errCode = testLib.RestTestCase.SUCCESS):
        expected = { 'errCode' : errCode }
        if count is not None:
            expected['count']  = count
        self.assertDictEqual(expected, respData)

    def testAdd1(self):
        respData = self.makeRequest("/users/add", method="POST", data = { 'user' : 'user1', 'password' : 'password'} )
        self.assertResponse(respData, count = 1)

    def testAdd2(self):
        respData = self.makeRequest("/users/add", method="POST", data = { 'user' : 'user1', 'password' : 'password'} )
        self.assertResponse(respData, count = 1)
        respData = self.makeRequest("/users/add", method="POST", data = { 'user' : 'user1', 'password' : 'password'} )
        self.assertResponse(respData, count = None, errCode = testLib.RestTestCase.ERR_USER_EXISTS)

    def testAdd3(self):
        respData = self.makeRequest("/users/add", method="POST", data = { 'user' : '' } )
        self.assertResponse(respData, count = None, errCode = testLib.RestTestCase.ERR_BAD_USERNAME)

    def testAdd4(self):
        respData = self.makeRequest("/users/add", method="POST", data = { 'user' : 'user2', 'password' : 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' } )
        self.assertResponse(respData, count = None, errCode = testLib.RestTestCase.ERR_BAD_PASSWORD)

    def testLogin1(self):
        respData = self.makeRequest("/users/add", method="POST", data = { 'user' : 'user1', 'password' : 'password'} )
        self.assertResponse(respData, count = 1)
        respData = self.makeRequest("/users/login", method="POST", data = { 'user' : 'user1', 'password': 'password'} )
        self.assertResponse(respData, count = 2)
        respData = self.makeRequest("/users/login", method="POST", data = { 'user' : 'user1', 'password': 'password'} )
        self.assertResponse(respData, count = 3)
        respData = self.makeRequest("/users/login", method="POST", data = { 'user' : 'user1', 'password': 'password'} )
        self.assertResponse(respData, count = 4)
        respData = self.makeRequest("/users/login", method="POST", data = { 'user' : 'user1', 'password': 'password'} )
        self.assertResponse(respData, count = 5)

    def testLogin2(self):
        respData = self.makeRequest("/users/add", method="POST", data = { 'user' : 'user1', 'password' : 'password'} )
        self.assertResponse(respData, count = 1)
        respData = self.makeRequest("/users/login", method="POST", data = { 'user' : 'user1', 'password': 'passord'} )
        self.assertResponse(respData, count = None, errCode = testLib.RestTestCase.ERR_BAD_CREDENTIALS)