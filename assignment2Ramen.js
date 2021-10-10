const Order = require("./assignment2Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SIZE:   Symbol("size"),
    TYPE:   Symbol("type"),
    APPETIZER:   Symbol("appetizer"),
    DESSERT:   Symbol("dessert"),
    DRINKS:  Symbol("drinks"),
    PAYMENT: Symbol("payment")
});

module.exports = class RamenOrder extends Order{
    constructor(sNumber, sUrl){
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sType = "";
        this.sAppetizer = "";
        this.sDessert = "";
        this.sDrinks = "";
        this.sItem = "ramen";
        this.sizeAmount = 0;
        this.typeAmount = 0;
        this.appetizerAmount = 0;
        this.dessertAmount = 0;
        this.drinksAmount = 0;
    }
    handleInput(sInput){
      let aReturn = [];

      switch(this.stateCur){
          case OrderState.WELCOMING:
              this.stateCur = OrderState.SIZE;
              aReturn.push("Welcome to Jon's Ramen House.");
              aReturn.push("What size would you like?");
              break;
          case OrderState.SIZE:
              this.stateCur = OrderState.TYPE

              if (sInput.toLowerCase() != 'small' && sInput.toLowerCase() != 'medium' && sInput.toLowerCase() != 'large') {
                this.stateCur = OrderState.SIZE;
                aReturn.push("Please enter a correct size (Small | Medium | Large)");
                break;
              }

              switch(sInput.toLowerCase()) {
                case 'small':
                  this.sizeAmount = 5;
                  break;
                case 'medium':
                  this.sizeAmount = 7;
                  break;
                case 'large':
                  this.sizeAmount = 8;
                  break;
                default:
                  break;
              }

              this.sSize = sInput;

              console.log(this.sizeAmount)

              aReturn.push("What type of Ramen would you like? (Shio | Shoyu | Miso)");
              break;
          case OrderState.TYPE:
              this.stateCur = OrderState.APPETIZER
              
              if (sInput.toLowerCase() != 'shio' && sInput.toLowerCase() != 'shoyu' && sInput.toLowerCase() != 'miso') {
                this.stateCur = OrderState.TYPE;
                aReturn.push("Please enter a correct type (Shio | Shoyu | Miso)");
                break;
              }

              switch(sInput.toLowerCase()) {
                case 'shio':
                  this.typeAmount += 5;
                  break;
                case 'shoyu':
                  this.typeAmount += 6;
                  break;
                case 'miso':
                  this.typeAmount += 5;
                  break;
                default:
                  break;
              }

              this.sType = sInput;

              console.log(this.typeAmount)

              aReturn.push("Would you like appetizer? (Edamame | Karaage | Shumai)");
              break;
          case OrderState.APPETIZER:
              this.stateCur = OrderState.DESSERT

              if(sInput.toLowerCase() === "no"){
                aReturn.push("How about Dessert? (Milkshake | Sundae)");
                break
              }

              if (sInput.toLowerCase() != 'edamame' && sInput.toLowerCase() != 'karaage' && sInput.toLowerCase() != 'shumai') {
                this.stateCur = OrderState.APPETIZER;
                aReturn.push("Please enter a correct type (Edamame | Karaage | Shumai)");
                break;
              }

              switch(sInput.toLowerCase()) {
                case 'edamame':
                  this.appetizerAmount += 4;
                  break;
                case 'karaage':
                  this.appetizerAmount += 3;
                  break;
                case 'shumai':
                  this.appetizerAmount += 5;
                  break;
                default:
                  break;
              }

              this.sAppetizer = sInput;

              console.log(this.appetizerAmount)

              aReturn.push("How about Dessert? (Milkshake | Sundae)");

              break;
          case OrderState.DESSERT:
              this.stateCur = OrderState.DRINKS

              if(sInput.toLowerCase() === "no"){
                aReturn.push("Would you like drinks with that?");
                break
              }

              if (sInput.toLowerCase() != 'milkshake' && sInput.toLowerCase() != 'sundae') {
                this.stateCur = OrderState.APPETIZER;
                aReturn.push("Please enter a correct type (Milkshake | Sundae)");
                break;
              }

              switch(sInput.toLowerCase()) {
                case 'milkshake':
                  this.dessertAmount += 5;
                  break;
                case 'sundae':
                  this.dessertAmount += 6;
                  break;
                default:
                  break;
              }
          
              this.sDessert = sInput;
              console.log(this.dessertAmount)

              aReturn.push("Would you like drinks with that?");
              break;
              
          case OrderState.DRINKS:
              this.stateCur = OrderState.PAYMENT;
              this.drinksAmount = 0;

              if(sInput.toLowerCase() != "no" || sInput.toLowerCase() != "nope" || sInput.toLowerCase() != "none" || sInput.toLowerCase() != "not" || sInput.toLowerCase() != "nay"){
                this.sDrinks = sInput;
                this.drinksAmount = 4;
              }
              
              this.nOrder = this.sizeAmount + this.typeAmount + this.appetizerAmount + this.dessertAmount + this.drinksAmount;

              console.log(this.nOrder)
      
              aReturn.push("Thank you for your order of");
              aReturn.push(`${this.sSize} ${this.sType} ${this.sItem}`);
              
              if ( this.sAppetizer && this.sDessert) {
                  aReturn.push(`with Appetizer of ${this.sAppetizer} and ${this.sDessert} Dessert`);
              } else if (this.sAppetizer) {
                  aReturn.push(`and Appetizer of ${this.sAppetizer}`);
              } else if (this.sDessert) {
                  aReturn.push(`and Dessert of ${this.sDessert}`);
              } 
              
              if (sInput.toLowerCase() != "no" || sInput.toLowerCase() != "nope" || sInput.toLowerCase() != "none" || sInput.toLowerCase() != "not" || sInput.toLowerCase() != "nay"){
                  aReturn.push(`plus ${this.sDrinks}`);
              }

              aReturn.push(`Please pay for your order here`);
              aReturn.push(`Your total order amount is ${this.nOrder}`);
              aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
              break;
          case OrderState.PAYMENT:
              console.log(sInput);
              this.isDone(true);
              let d = new Date(); 
              d.setMinutes(d.getMinutes() + 20);
              aReturn.push(`Your order will be delivered at ${d.toTimeString()}`);
              break;
      }
      return aReturn;
  }
  
    renderForm(sTitle = "-1", sAmount = "-1"){
      // your client id should be kept private
      if(sTitle != "-1"){
        this.sItem = sTitle;
      }
      if(sAmount != "-1"){
        this.nOrder = sAmount;
      }
      const sClientID = process.env.SB_CLIENT_ID || 'put your client id here for testing ... Make sure that you delete it before committing'
      return(`
      <!DOCTYPE html>
  
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- Ensures optimal rendering on mobile devices. -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <!-- Optimal Internet Explorer compatibility -->
      </head>
      
      <body>
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script
          src="https://www.paypal.com/sdk/js?client-id=${sClientID}"> // Required. Replace SB_CLIENT_ID with your sandbox client ID.
        </script>
        Thank you ${this.sNumber} for your ${this.sItem} order of $${this.nOrder}.
        <div id="paypal-button-container"></div>
  
        <script>
          paypal.Buttons({
              createOrder: function(data, actions) {
                // This function sets up the details of the transaction, including the amount and line item details.
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: '${this.nOrder}'
                    }
                  }]
                });
              },
              onApprove: function(data, actions) {
                // This function captures the funds from the transaction.
                return actions.order.capture().then(function(details) {
                  // This function shows a transaction success message to your buyer.
                  $.post(".", details, ()=>{
                    window.open("", "_self");
                    window.close(); 
                  });
                });
              }
          
            }).render('#paypal-button-container');
          // This function displays Smart Payment Buttons on your web page.
        </script>
      
      </body>
          
      `);
  
    }
}