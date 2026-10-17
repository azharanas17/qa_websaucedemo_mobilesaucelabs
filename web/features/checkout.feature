Feature: Checkout

  As a user
  I want to complete checkout
  So that I can place an order

  Background:
    Given the user is on the login page
    When the user logs in with username "standard_user" and password "secret_sauce"
    Then the user should be redirected to the inventory page
    When the user adds "Sauce Labs Backpack" to the cart
    And the user opens the cart
    And the user proceeds to checkout

  @checkout
  Scenario: Checkout with valid information
    When the user fills checkout information with first name "John", last name "Doe", postal code "12345"
    And the user continues to overview
    Then the order summary should be displayed
    When the user finishes the order
    Then the order confirmation should show "Thank you for your order!"

  @checkout @validation
  Scenario: Checkout missing first name
    When the user fills checkout information with first name "", last name "Doe", postal code "12345"
    And the user continues to overview
    Then the checkout error message should be "Error: First Name is required"

  @checkout @validation
  Scenario: Checkout missing postal code
    When the user fills checkout information with first name "John", last name "Doe", postal code ""
    And the user continues to overview
    Then the checkout error message should be "Error: Postal Code is required"
