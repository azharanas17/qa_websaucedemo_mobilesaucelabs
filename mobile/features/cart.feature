Feature: Mobile Shopping Cart

  @mobile @positive
  Scenario: View cart and continue shopping
    Given I am logged in on mobile as "standard_user"
    And I have added the first product to cart
    When I open the cart
    Then I should see the cart screen
    When I continue shopping
    Then I should see the products screen

  @mobile @positive
  Scenario: Proceed to checkout from cart
    Given I am logged in on mobile as "standard_user"
    And I have added the first product to cart
    When I open the cart
    And I proceed to checkout
    Then I should see the checkout information screen
