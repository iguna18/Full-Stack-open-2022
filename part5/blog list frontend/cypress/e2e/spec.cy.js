describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
    cy.request('POST', 'http://localhost:3003/api/users', { name: 'dudu', username:'dudu', password:'dudu' })
  })

  it('Login form is shown', function() {
    cy.contains('login') //button
    cy.contains('log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#showbutton').click()
      cy.get('input:first').type('dudu')
      cy.get('input:last  ').type('dudu')
      cy.get('#loginsubmitbutton').click()
      cy.contains('has logged in')
      cy.get('html').should('not.contain','login')
      cy.get('html').should('not.contain','log in to application')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login')
      cy.contains('log in to application')
      cy.get('html').should('not.contain', 'has logged in')

    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#showbutton').click()
      cy.get('input:first').type('dudu')
      cy.get('input:last  ').type('dudu')
      cy.get('#loginsubmitbutton').click()
      cy.contains('has logged in')
      cy.get('html').should('not.contain','login')
      cy.get('html').should('not.contain','log in to application')
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('input').eq(0).type('testtitle')
      cy.get('input').eq(1).type('testauthor')
      cy.get('input').eq(2).type('testurl')
      cy.get('#createbutton').click()
      cy.contains('testtitle by testauthor')
      cy.contains('view')
    })

    describe('When at least one blog created', function() {
      beforeEach(function() {
        cy.contains('new blog').click()
        cy.get('input').eq(0).type('rame')
        cy.get('input').eq(1).type('rame')
        cy.get('input').eq(2).type('rame')
        cy.get('#createbutton').click()
      })
  
      it('A blog can be liked', function() {
        cy.get('.blogentry').contains('rame by rame').parent().as('theBlogEntry')
        cy.get('@theBlogEntry').contains('view').click()
        cy.get('@theBlogEntry').contains('like').parent().as('likes')
        cy.get('@likes').contains('like').click()
        cy.get('@likes').contains('1')
      })
      it('A blog can be removed', function() {
        cy.get('.blogentry').contains('rame by rame').parent().as('theBlogEntry')
        cy.get('@theBlogEntry').contains('view').click()
        cy.get('@theBlogEntry').contains('remove').click()
        cy.on('window:confirm', () => true);
        cy.get('.blogentry').its('length').should('eq', 0)
      })
      it.only('blogs are in correct order', function() {
        cy.get('input').eq(0).type('rume')
        cy.get('input').eq(1).type('rume')
        cy.get('input').eq(2).type('rume')
        cy.get('#createbutton').click()

        
        cy.get('.blogentry').contains('rame by rame').parent().as('theBlogEntry2')
        cy.get('@theBlogEntry2').contains('view').click()
        cy.get('@theBlogEntry2').contains('like').parent().as('likes2')
        cy.get('@likes2').contains('like').click()
        cy.get('@likes2').contains('like').click()
        
        cy.get('.blogentry').contains('rume by rume').parent().as('theBlogEntry1')
        cy.get('@theBlogEntry1').contains('view').click()
        cy.get('@theBlogEntry1').contains('like').parent().as('likes1')
        cy.get('@likes1').contains('like').click()

        cy.get('.blogentry').eq(0).contains('rame by rame')
        cy.get('.blogentry').eq(1).contains('rume by rume')
      })
    })
  })

})
