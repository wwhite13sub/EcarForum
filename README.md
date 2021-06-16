## ElectricCarForum
An electric-Car forum built with React

README.MD 

1.  NAME:  Wanda White

2.  OVERVIEW/DESCRIPTION:  Project is to develop a three-tier forum website that has one Dashboard  page.   The site is to be used by anyone who is interested in a forum on five specific electric vehicles.  It will save all user registration, questions and answers added from one login session to another (on backend MySQL database).  The website has five main functions:  
    1) Registration page 
    2) Login page
    3) Dashboard Page 
    4) Add Question modal
    5) View Answers modal 
    6) Answer Question modal
    The site will be pre-loaded with five categories of electric cars, two user ids, seven questions and three answers.   The site should have all functionality on both desktop and mobile devices and should be accessed via a hosting web site.


3.  TECHNOLOGIES USED:  React, Redux, React-Redux, Node.js, Express, JavaScript, MySQL, HTML, CSS. ESLint, Bootstrap, DesignIO, AJAX, JSON, GitHub, HOSTING SITE: Heroku 

4.  IDEAS FOR FUTURE IMPROVEMENT:
    a) Improve user experience by allowing user to send email to specific user id’s requesting help with a specific question.
    b) Improve user experience by allowing user to search answers for key words.
    c) Improve user experience by allowing user to search questions for key words.   
    d) Improve user experience by allowing user to reset password (if it is forgotten) by answering pre-answered questions with correct answers.
    e) Improve user experience by providing user id (if it is forgotten) by answering questions and recording a code sent to users email or text message.
    f) Improve user experience by allowing user to delete questions that have not been answered.
    g) Improve user experience by allowing user to update questions that have not been answered.

EXECUTION INSTRUCTIONS:
  https://electric-car-forum.herokuapp.com/Login
1. Click on “Register” on the navigation bar.
        ◦ Create username and password.
        ◦ Accept terms and conditions.
        ◦ Page will redirect to Login.
2. Login with created username and password and you will be directed to the dashboard.
3. Click on a category to view a list of relative questions.
4. Navigate through pages with listed page number
        ◦ Scroll up or down to show listed content 
5. Click “View” to display question detail and answers
        ◦ Click “Answer” to answer question 
        ◦ Click “Return to Dashboard” to return to main page
6. Click on “New Question” within the selected category to enter new question.
        ◦ Input a question and click “submit” to exit without asking a question click “Cancel”
7. Click on “Answer” button to respond to a users question.
        ◦ Input a answer and click “submit” to respond to exit without responding click “Cancel”
8. Click “Logout” to login out of application.
    
    
    ### [Online Version][1]
Check out the Heroku app running [here][1].


### Development

```sh
git clone https://github.com/wwhite13sub/EcarForum.git
cd EcarForum
npm install
```

To run the app:
```sh
npm run dev
# and in another terminal, run the client side:
cd client
npm start
```

This will open `localhost:3000`.         
   

DATA PRE-POPULATED IN TABLES:

Create Queries
0.) DROP DATABASE IF EXISTS Qforum;
	CREATE DATABASE Qforum;
	SELECT DATABASE();
	
	
 1. use Qforum;

	CREATE Table Category_TBL(
	Category_num int NOT NULL AUTO_INCREMENT,
	Category_descr varchar(20) NOT NULL, 
	PRIMARY KEY ( Category_num ));
2. use Qforum;

	CREATE Table User_TBL(
	user_ID int NOT NULL AUTO_INCREMENT,
	user_password varchar(255) NOT NULL, 
	user_firstname varchar(20) NOT NULL,
	PRIMARY KEY ( user_ID ));
	
	
3. use Qforum;

	CREATE Table Question_TBL(
    	Question_num int NOT NULL AUTO_INCREMENT,
	Category_num int NOT NULL,
	Question_descr varchar(500) NOT NULL,
	user_ID int NOT NULL,
	Question_Date_Time DATETIME NOT NULL,
	PRIMARY KEY (Question_num),
    	FOREIGN KEY FK_Question_Category_num(Category_num) REFERENCES 	Category_TBL(Category_num),
	FOREIGN KEY FK_Question_user_ID(user_ID) REFERENCES User_TBL(user_ID));
	
	
4. use Qforum;
    CREATE Table Answer_TBL(
    Answer_num INT NOT NULL AUTO_INCREMENT,
    Category_num INT NOT NULL,
    Question_num INT NOT NULL,
    Answer_descr varchar(500) NOT NULL,
    user_ID INT NOT NULL,
    Answer_Date_Time DATETIME NOT NULL,
    PRIMARY KEY (Answer_num),
    FOREIGN KEY FK_Answer_Question_Categorynum (Category_num) REFERENCES Category_TBL(Category_num),
    FOREIGN KEY FK_Answer_Question_Questionnum (Question_num) REFERENCES Question_TBL(Question_num), 
    FOREIGN KEY FK_Answer_Question_user_ID (user_ID) REFERENCES User_TBL(user_ID));

Insert Queries:

1. use Qforum;

    INSERT INTO Category_TBL (Category_descr) 
    VALUES ('BMW I3');
    INSERT INTO Category_TBL (Category_descr) 
    VALUES ('Chevrolet Bolt');
    INSERT INTO Category_TBL (Category_descr) 
    VALUES ('Kia Soul');
    INSERT INTO Category_TBL (Category_descr) 
    VALUES ('Nissan Leaf');
    INSERT INTO Category_TBL (Category_descr) 
    VALUES ('Tesla Model 3');

    commit;

2. use Qforum;

    INSERT INTO User_TBL (user_password, user_firstname) 
    VALUES ('$2a$10$Gnffnxn7s8BgFnKliq0kg.zWNKq8hnliPth6oEQk.1.wa.52lt8HW', 'Buddyman');
    INSERT INTO User_TBL (user_password, user_firstname) 
    VALUES ('$2a$10$5uBDrKnZQAdBk9Ou/ku7IeEn8IAulULYM.h3HEat.wKrdzehkw9VS', 'Bellalady');

    commit;

3. use Qforum;

    INSERT INTO Question_TBL (Category_num, Question_descr, user_ID, Question_Date_Time ) 
    VALUES (1, 'What is cost BMW1?', 1, '2020-10-20 01:09:10'),
    (1, 'How many years has it been produced?', 1, '2020-10-20 08:09:10'),
    (2, 'What is cost Chevy?', 2, '2020-10-21 08:09:10'),
    (2, 'How many years does battery last?', 2, '2020-10-22 08:09:10'),
    (3, 'Is there any government rebate?', 2, '2020-10-24 08:09:10'),
    (5, 'What is cost Tesla?', 1, '2020-10-25 08:09:10'),
    (5, 'How many miles without charging?', 2, '2020-10-26 08:09:10');

4. use Qforum;

    INSERT INTO Answer_TBL (Category_num, Question_num, Answer_descr, user_ID, Answer_Date_Time ) 
    VALUES (1, 1, '$45K', 2, '2020-10-30 10:09:10')
    (1, 1, '$60K', 2, '2020-11-01 10:09:10')
    (2, 3, 'Google it for most recent cost', 2, '2020-11-02 10:09:10');


[1]: https://electric-car-forum.herokuapp.com/Dashboard

