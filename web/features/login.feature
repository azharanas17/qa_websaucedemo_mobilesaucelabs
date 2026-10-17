
Feature: User Login

  As a SauceDemo user
  I want to log in to the application
  So that I can access the product inventory

  Background:
    Given the user is on the login page

  @smoke @positive
  Scenario: Login with valid credentials
    When the user logs in with username "standard_user" and password "secret_sauce"
    Then the user should be redirected to the inventory page

  @negative
  Scenario: Login with invalid credentials
    When the user logs in with username "invalid_user" and password "secret_sauce"
    Then the login error message should be "Epic sadface: Username and password do not match any user in this service"

  @negative
  Scenario: Login with a locked-out user
    When the user logs in with username "locked_out_user" and password "secret_sauce"
    Then the login error message should be "Epic sadface: Sorry, this user has been locked out."

  @negative @validation
  Scenario: Login without username
    When the user submits the login form with username "" and password "secret_sauce"
    Then the login error message should be "Epic sadface: Username is required"

  @negative @validation
  Scenario: Login without password
    When the user submits the login form with username "standard_user" and password ""
    Then the login error message should be "Epic sadface: Password is required"
