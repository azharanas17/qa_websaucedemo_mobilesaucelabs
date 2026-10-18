Feature: Mobile Login
  The Sauce Labs sample mobile app only accepts three usernames:
  standard_user, locked_out_user and problem_user (as shown on the login screen).

  @mobile @login @smoke @positive
  Scenario: Successful login with valid credentials
    Given I am on the mobile login screen
    When I login with username "standard_user" and password "secret_sauce"
    Then I should see the products screen

  @mobile @login @positive
  Scenario: Successful login with problem user
    Given I am on the mobile login screen
    When I login with username "problem_user" and password "secret_sauce"
    Then I should see the products screen

  @mobile @login @negative
  Scenario: Locked out user cannot login
    Given I am on the mobile login screen
    When I login with username "locked_out_user" and password "secret_sauce"
    Then I should see the mobile login error "Sorry, this user has been locked out."

  @mobile @login @negative
  Scenario: Login with unknown user is rejected
    Given I am on the mobile login screen
    When I login with username "unknown_user" and password "secret_sauce"
    Then I should see the mobile login error "Username and password do not match any user in this service."

  @mobile @login @negative
  Scenario: Login with empty credentials shows error
    Given I am on the mobile login screen
    When I login with username "" and password ""
    Then I should see the mobile login error "Username is required"
