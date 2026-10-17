Feature: Product Inventory

  As a logged in user
  I want to view and manage products
  So that I can shop for items

  Background:
    Given the user is on the login page
    When the user logs in with username "standard_user" and password "secret_sauce"
    Then the user should be redirected to the inventory page

  @smoke
  Scenario: Inventory displays products
    Then the inventory should show at least one product
    And product names and prices should be visible

  @sorting
  Scenario: Sort products by name A to Z
    When the user sorts products by "az"
    Then product names should be in ascending order

  @sorting
  Scenario: Sort products by name Z to A
    When the user sorts products by "za"
    Then product names should be in descending order

  @sorting
  Scenario: Sort products by price low to high
    When the user sorts products by "lohi"
    Then product prices should be in ascending order

  @sorting
  Scenario: Sort products by price high to low
    When the user sorts products by "hilo"
    Then product prices should be in descending order
