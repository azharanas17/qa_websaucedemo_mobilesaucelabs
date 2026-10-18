Feature: Mobile Checkout

  @mobile @positive
  Scenario: Complete checkout with valid information
    Given I am logged in on mobile as "standard_user"
    And I have added the first product to cart
    And I have proceeded to checkout
    When I fill in checkout information with first name "Sauce", last name "Demo", zip "12345"
    And I continue to checkout overview
    Then I should see the checkout overview screen
    When I finish checkout
    Then I should see the checkout complete screen
