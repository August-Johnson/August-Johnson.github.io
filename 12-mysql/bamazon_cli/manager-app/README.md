# BAMAZON MANAGER VERSION (EXTRA)

<p>Creating a new CLI for the 'manager'. Adds new commands for the user to select from.
  
  * VIEW PRODUCTS FOR SALE
  * VIEW LOW INVENTORY
  * ADD TO INVENTORY
  * ADD NEW PRODUCT
  
  The manager can view all of the current products being sold, as well as viewing the products with a stock quantity of less than five. The manager also has the ability to add more stock quantity to any product they wish. The manager has the option to add another product to the table.</p>
  
  <hr>
  
  ## CHALLENGES
  * Handling the MySQL queries from the manager's input and updating the database correctly.
  * Sending and returning the data in the correct format.
  
  <hr>

### MANAGER OPTIONS
<p>The list of actions the manager can do.</p>
  
![list of manager commands](https://github.com/August-Johnson/August-Johnson.github.io/blob/master/12-mysql/screenshots/managerOptions-pic.png)

<hr>

### VIEW LOW INVENTORY
<p>Displays all items with a stock quantity of less than 5. In this example all the items had more than 5 in stock, so it displayed the message saying such.</p>
  
![list of low quantity products](https://github.com/August-Johnson/August-Johnson.github.io/blob/master/12-mysql/screenshots/lowInventory-pic.png)

<hr>

### ADD TO INVENTORY (BEFORE)
<p>Choosing what item you would like to add stock quantity to, and how much.</p>
  
![add to inventory command](https://github.com/August-Johnson/August-Johnson.github.io/blob/master/12-mysql/screenshots/beforeQuantity-pic.png)

<hr>

### ADD TO INVENTORY (AFTER)
<p>Shows the stock quantity of the item after the manager added more.</p>
  
![product list after add to inventory command](https://github.com/August-Johnson/August-Johnson.github.io/blob/master/12-mysql/screenshots/afterQuantiy-pic.png)

<hr>

### ADD NEW PRODUCT (BEFORE)
<p>Entering the info for the new item being added to the table/product list.</p>

![adding new product to table](https://github.com/August-Johnson/August-Johnson.github.io/blob/master/12-mysql/screenshots/addingItem-pic.png)

<hr>

### ADD NEW PRODUCT (AFTER)
<p>Displays the updated list of products after having a new one added to it.</p>

![table after adding new product](https://github.com/August-Johnson/August-Johnson.github.io/blob/master/12-mysql/screenshots/itemAdded-pic.png)
