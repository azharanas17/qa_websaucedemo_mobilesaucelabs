Feature: Shopping Cart

  As a user
  I want to add and remove products from cart
  So that I can review my purchase

  Background:
    Given the user is on the login page
    When the user logs in with username "standard_user" and password "secret_sauce"
    Then the user should be redirected to the inventory page

  @cart
  Scenario: Add product to cart
    When the user adds "Sauce Labs Backpack" to the cart
    Then the cart badge should show "1"

  @cart
  Scenario: Cart shows added product
    When the user adds "Sauce Labs Backpack" to the cart
    And the user opens the cart
    Then the cart should contain "Sauce Labs Backpack"

  @cart
  Scenario: Remove product from cart
    When the user adds "Sauce Labs Backpack" to the cart
    And the user adds "Sauce Labs Bike Light" to the cart
    And the user opens the cart
    And the user removes "Sauce Labs Backpack" from the cart
    Then the cart should not contain "Sauce Labs Backpack"
    And the cart should contain "Sauce Labs Bike Light"
