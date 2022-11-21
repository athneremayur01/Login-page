'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP



// Data
const account1 = {
  owner: 'Himanshu Singh',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Ankit Kumar',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Atul Patil',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Omkar  Relkar ',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];
///////////////////////////////////////////////




// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES





/////////////////////////////////////////////////

//actual code for the application

// Code for the display 

const displayMovements = function (acc) { 
  containerMovements.innerHTML = ' ';
  // .texthtml = 0
  //const movs = sort ? movements.slice().sort((a ,b) => a -b) : movements
  acc.movements.forEach(function(mov,i){

    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${ i +1} ${type}</div>
          
          <div class="movements__value">${mov}</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin' , html);


  });

  };

 //displayMovements(account1.movements);




// function to Create the or compute the 
// one of the version of the to use this funtion

const user = 'Himanshu Singh Rathore';
const username = user.toLowerCase().split(' ').map(name =>{
  return name[0];
})
.join('');

//console.log(username);

//another way to apply the same logic for the code to use the concept for this
const creatUsename = function(accs){
  accs.forEach(function (acc){
    acc.username = acc.owner
    .toLowerCase()
    .split(' ')
    .map(name =>name[0])
    .join('');
  });

};
creatUsename(accounts);
//console.log(accounts);

const calPrintBalance = function(acc){
   const balance = acc.movements.reduce((acc , mov)=>acc 
  + mov, 0);
    acc.balance  = balance;
  labelBalance.textContent = `${acc.balance} RUPEE`;
};

//calPrintBalance(account1.movements);

const   calDisplaySummary = function (acc){
  const incomes = acc.movements.filter(mov => mov >0)
  .reduce((acc, mov ) => acc +mov , 0 );
  labelSumIn.textContent = `${incomes}₹
  `;
  const outIncome = acc.movements.filter(mov => mov <0)
  .reduce((acc, mov ) => acc +mov , 0);
  labelSumOut.textContent = `${Math.abs(outIncome)}₹`;

  const interest = acc.movements
    .filter(mov => mov >0)
    .map( deposit => (deposit * acc.interestRate)/100)
     .filter((int ,i , arr ) => {
       //console.log(arr);            //this part of code is helpful to understand the 
                                    // and debug it while doing any sort of the calculations  
       return int >= 1;
     })
    .reduce((acc,int) => acc + int, 0 );

    labelSumInterest.textContent = `${interest}`;


}
// calDisplaySummary(account1.movements);

// updateUI function 

const updateUI = function(acc){

  displayMovements(acc);
  // Display balance 
  calPrintBalance(acc);
  // display summary 
  calDisplaySummary(acc);
}

/// _________________Event  Handlers ___________///
//***** Implementing login  *******///

// we need to  have  track of the usernames 

let currentAccount;


btnLogin.addEventListener('click' , function(e){
  // Prevent form submitting  to do add  a parameter in the callback function
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  
  if(currentAccount?.pin === Number(inputLoginPin.value)){
   // console.log('Login');
    //display the ui if its is the right username and pin
    labelWelcome.textContent = `Welcome Back,
    ${currentAccount.owner.split(' ')[0]} `;
    containerApp.style.opacity = 100;
    
    //clear the input fields
    inputLoginUsername.value = inputLoginPin.value = '';

    inputLoginPin.blur();
   // updateUi after the operations
    updateUI(currentAccount)

  }

  

})




//____________Impementing the Transfer facility ______________//

// target the transfer button 

btnTransfer.addEventListener('click' , function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcccount = accounts.find(
    acc => acc.username === inputTransferTo.value)
   // console.log(amount , receiverAcccount);

    inputTransferAmount.value = inputTransferTo.value = '';
    if (amount > 0 && receiverAcccount && currentAccount.balance >=
      amount && receiverAcccount?.username !==
      currentAccount.username) {

        //doing the changes in the balance
      currentAccount.movements.push(-amount);
      receiverAcccount.movements.push(amount);
      updateUI(currentAccount);
    }

});

// the close account feature

btnClose.addEventListener('click' ,function(e){
  
  e.preventDefault();
 // console.log("delete");
  if (inputCloseUsername.value === currentAccount.username
    && Number(inputClosePin.value) === currentAccount.pin ) 
    {
      const index = accounts.findIndex(acc => acc.username
        === currentAccount.username);
       // console.log(index);

       //after finding the right person delete the account
        accounts.splice(index , 1)
        // hide the ui 
        containerApp.style.opacity = 0;
        inputCloseUsername.value= inputClosePin.value = '';

  }

} )
// implementing the loan feature 

btnLoan.addEventListener('click' , function(e){
    e.preventDefault();
    const amount =Number(inputLoanAmount.value);

    if (amount > 0 && currentAccount.movements.some(
      mov => mov >= amount * 0.1
    )) {
      
      // add movement 
      currentAccount.movements.push(amount);

      //update ui
      updateUI(currentAccount)

    }
    inputLoanAmount.value = '';
    
});

/////////////////////////////////////
//methods of the 
//let arr = ['a'  ,'b' , 'd' ,'e','f'];


//slice methods 

// console.log(arr.slice(2));
// console.log(arr.slice(3));
// console.log(arr.slice(4));

// console.log(arr.slice(2,3));
// console.log(arr.slice(1,3));

// console.log(arr.slice(0,2));


//splice 
// console.log(arr.splice(-1));
// console.log(arr.splice(2,4));
// console.log(arr.splice(2));
// console.log(arr.splice(2));
// console.log(arr);




//reverse 

// arr = ['a' , 'b' ,'c','d'];
// const arr2 = ['j' , 'i' , 'h','g','f'];
// console.log(arr2.reverse());
// console.log(arr2);

//concat 
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr , ...arr2]);

//join 
// console.log(letters.join('-'));

// const arr3 = [23, 11,64 ,321 ,321 , 41 ,354];

// console.log(arr[0]);
// console.log(arr.at(0));
// console.log(arr3.at(-1));

// //getting the last array element 
// console.log(arr[arr.length -1]);
// console.log(arr.slice(-1).length[0]);
// console.log(arr.at(-1));



//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// for (const movements of movements)

// for(const [i, movement]  of movements.entries() ){
//   if (movement >0) {
//     console.log(`Movement ${i +1} : You deposited ${movement}`);

//   }else{
//     console.log(`Movement ${i +1} : You withdrew ${Math.abs(movement)}`);
//   }

// }

// console.log('____________ ForEach________');
// movements.forEach(function(mov , i ,arr){
//   if (mov>0) {
//     console.log(`Movement ${i +1} : You deposited ${mov}`);

//   }else{
//     console.log(`Movement ${i +1} : You withdrew ${Math.abs(mov)}`);
//   }

// })

// THe major differnce between the two loops is that in 
// forEach loop we cannot break it.




// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function(values , key ,map){
//   console.log(`The currency in the ${key} is The ${values}`);
// });


//set





// easy way to apply the filter method

// const deposits  = movements.filter(function(mov){
//   return mov >0;
// } );

// console.log(movements);
// console.log(deposits);


// const depositsFor = [];
// for(const mov of movements) if (mov >0) depositsFor.push(mov);
// console.log(depositsFor);






 const Movements = [200, -200, 340, -300, -20, 50, 400, -460];
// const balance = Movements.reduce(function(acc , cur , i ,arr ){
//   console.log(`Iteration ${i} : ${acc} `);
//   return acc + cur;
// } ,100);
// console.log(balance);

//above code can be written in the efficient WebAssembly.

// const balance = Movements.reduce((acc, cur)=> 
// acc + cur , 0 );
// console.log(balance);


// pipeline its difficult to debug the this results
// const eurTOusd = 1.1;
// const totalDepositsUSD = Movements
//     .filter(mov => mov >0)
//     .map(mov => mov * eurTOusd)
//     .reduce((acc, mov) => acc + mov, 0 );

// console.log(totalDepositsUSD);    

// some more methods to work on

// const firstdwithdrawal =  Movements.find(mov => mov < 0); // this method don not return the array it return the first element that satisfied the condition
// console.log(Movements);
// console.log( firstdwithdrawal);



const x = new Array(7);
console.log(x);