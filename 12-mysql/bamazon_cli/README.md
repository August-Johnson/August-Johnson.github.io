# WEEK 12 HOMEWORK ASSIGNMENT

<p>This week's homework assignment was to create a CLI app using JavaScript, Node and MySQL. The concept of this app is similar to an online store.
The completed app should ask the user upon connecting to the database, what action thay would like to do. If the user chooses to exit, the connection to the database will end. If the user chose to browse items, they will be displayed a list of items along with their basic info (item ID, product name, the price, quantity in stock).
The user is then asked to enter the 'item ID' of the product they wish to purchase. They will then be asked to enter how much of the product they wish to purchase. I added extra logic where the user can exit out of this prompt, should they change their mind or made a mistake.
If there is enough of the product in stock to meet the users request, it will display the total cost of their order and update the database accordingly.</p>

## CHALLENGES

* Working with databases and handling how the data is returned and shared.
* Adding enough logic so the user is never really 'trapped'

### SCREENSHOTS OF APP

#### INITIAL PROMPT UPON CONNECTING SUCCESSFULLY TO THE DATABASE
![initial user ask prompt](https://github.com/August-Johnson/August-Johnson.github.io/blob/master/12-mysql/screenshots/askUser-pic.png)

<hr>

#### DISPLAYS THE LIST OF ITEMS ALONG WITH THEIR INFO
![items and their info](https://github.com/August-Johnson/August-Johnson.github.io/blob/master/12-mysql/screenshots/showItems-pic.png)

<hr>

#### DISPLAYS THE TOTAL COST OF THE PURCHASE
![valid purchase and total cost of the purchase](https://github.com/August-Johnson/August-Johnson.github.io/blob/master/12-mysql/screenshots/validPurchase-pic.png)

<hr>

#### SHOWS THE UPDATED STOCK QUANTITY AFTER THE PURCHASE
![updated stock quantity after purchase](https://github.com/August-Johnson/August-Johnson.github.io/blob/master/12-mysql/screenshots/updatedStock-pic.png)

<hr>

#### IF THERE ISN'T ENOUGH OF THE PRODUCT IN STOCK
![display message not enough items in stock](https://github.com/August-Johnson/August-Johnson.github.io/blob/master/12-mysql/screenshots/notEnough-pic.png)

### BONUS (MANAGER MODE)
<p>Creating a new CLI for the 'manager'. Adds new commands for the user to select from.
  
  * VIEW PRODUCTS FOR SALE
  * VIEW LOW INVENTORY
  * ADD TO INVENTORY
  * ADD NEW PRODUCT
  
  The manager can view all of the current products being sold, as well as viewing the products with a stock quantity of less than 5. The manager also has the ability to add more stock quantity to any product they wish. The manager has the option to add another product to the table.</p>
  

#### MANAGER OPTIONS
<p>The list of actions the manager can do.</p>
  
![list of manager commands](https://github.com/August-Johnson/August-Johnson.github.io/blob/master/12-mysql/screenshots/managerOptions-pic.png)

<hr>

#### VIEW LOW INVENTORY
<p>Displays all items with a stock quantity of less than 5. In this example all the items had more than 5 in stock, so it displayed the message saying such.</p>
  
![list of low quantity products](https://github.com/August-Johnson/August-Johnson.github.io/blob/master/12-mysql/screenshots/lowInventory-pic.png)

<hr>

#### ADD TO INVENTORY (BEFORE)
<p>Choosing what item you would like to add stock quantity to, and how much.</p>
  
![add to inventory command](https://github.com/August-Johnson/August-Johnson.github.io/blob/master/12-mysql/screenshots/beforeQuantity-pic.png)

<hr>

#### ADD TO INVENTORY (AFTER)
<p>Shows the stock quantity of the item after the manager added more.</p>
  
![product list after add to inventory command](https://github.com/August-Johnson/August-Johnson.github.io/blob/master/12-mysql/screenshots/afterQuantiy-pic.png)

<hr>

#### ADD NEW PRODUCT (BEFORE)
<p>Entering the info for the new item being added to the table/product list.</p>

![adding new product to table](https://github.com/August-Johnson/August-Johnson.github.io/blob/master/12-mysql/screenshots/addingItem-pic.png)

<hr>

#### ADD NEW PRODUCT (AFTER)
<p>Displays the updated list of products after having a new one added to it.</p>

![table after adding new product](https://github.com/August-Johnson/August-Johnson.github.io/blob/master/12-mysql/screenshots/itemAdded-pic.png)
