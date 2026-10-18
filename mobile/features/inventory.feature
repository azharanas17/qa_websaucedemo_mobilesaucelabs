Feature: Mobile Product Inventory

  @mobile @smoke @positive
  Scenario: Add product to cart from inventory
    Given I am logged in on mobile as "standard_user"
    And I am on the mobile products screen
    When I add the first product to cart
    Then the cart badge should show 1

  @mobile @positive
  Scenario: Remove product from cart on inventory screen
    Given I am logged in on mobile as "standard_user"
    And I am on the mobile products screen
    When I add the first product to cart
    And I remove the first product from cart
    Then the cart badge should not be visible
