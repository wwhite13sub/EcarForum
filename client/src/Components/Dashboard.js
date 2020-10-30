// import App from './App';
//This is HOME page for components
import React from 'react';


function Details(props) {
    switch(props.type) {
    case 'static':
        return (
            <div className="text-center">
                Select a category to view its questions.
            </div>
        )
    case 'questionList':
        return (
            <div className="pt-4 pl-3">
                <div className="row relative">
                    <div className="col-6">
                        <h2>{props.selectedCategory.Category_descr}</h2>
                    </div>
                    <div className="col-6 text-right">
                        <button className="btn selected new-question">
                            New Question
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-8">
                    </div>
                    <div className="d-none d-sm-block col-sm-2 small">
                        SEE QUESTON DETAIL AND ANSWER
                    </div>
                    <div className="d-none d-sm-block col-sm-2 small">
                        ANSWER QUESTION
                    </div>
                </div>

                {props.loadQuestionList()}
            </div>
        )
    }
    
}


class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            detailsType: 'static',//questionList, questionDetails
            selectedCategory: null,
            categories: [
                {
                    Category_num: 1,
                    Category_descr: 'BMW Int3'
                },
                {
                    Category_num: 2,
                    Category_descr: 'Chevrolet Bolt'
                },
                {
                    Category_num: 3,
                    Category_descr: 'Kia Soul'
                },
                {
                    Category_num: 4,
                    Category_descr: 'Nissan Leaf'
                },
                {
                    Category_num: 5,
                    Category_descr: 'Tesla Model 3'
                }
                
            ],
            questionList: [
                {
                    Category_num: 1,
                    Question_num: 1,
                    user: {
                        user_firstname: 'Wanda 1'
                    },
                    Question_Date_Time: '11/11/2020 16:12',
                    Answers_num: 3,
                    Question_descr: 'What is my name?'
                },
                {
                    Category_num: 1,
                    Question_num: 2,
                    user: {
                        user_firstname: 'Wanda 2'
                    },
                    Question_Date_Time: '11/13/2020 16:12',
                    Answers_num: 4,
                    Question_descr: 'What is my job?'
                },
                {
                    Category_num: 1,
                    Question_num: 3,
                    user: {
                        user_firstname: 'Wanda 1'
                    },
                    Question_Date_Time: '11/15/2020 16:12',
                    Answers_num: 1,
                    Question_descr: 'What is my dog name?'
                },
                {
                    Category_num: 1,
                    Question_num: 4,
                    user: {
                        user_firstname: 'Wanda 3'
                    },
                    Question_Date_Time: '11/20/2020 16:12',
                    Answers_num: 8,
                    Question_descr: 'Do I own a cat?'
                }
            ]
        };
    }

    changeDetails = (type, category) => {
        console.log(type, category);
        this.setState({
            detailsType: type,
            selectedCategory: category
        })
    }

    // This will pull from categories array 
    generateCategoryList = () => {
        const categoryListMarkup = this.state.categories.map((category, index) => {
            return (
                <div 
                    className={'border p-3 pointer transparent-background '+((this.state.selectedCategory !== null && this.state.selectedCategory.Category_num === category.Category_num)?'selected': '')}
                    onClick={(event) => this.changeDetails('questionList', category)} 
                    key={index}
                >
                    {category.Category_descr}
                </div>
            )
        });

        return categoryListMarkup;
    }

    //this will loop new questions list 
    loadQuestionList = () => {
        const questionListMarkup = this.state.questionList.map((question, index) => {
            return (
                <div className="row my-4" key={index}>
                    <div className="col-12 col-sm-8">
                        <div>
                            Question {question.Question_num} {question.Question_Date_Time} {question.Answers_num} answers
                        </div>
                        <div>{question.Question_descr}</div>
                    </div>
                    <div className="col-12 col-sm-2 mt-3 mt-sm-0">
                        <button className="btn btn-success">View</button>
                    </div>
                    <div className="col-12 col-sm-2 mt-3 mt-sm-0">
                        <button className="btn btn-success">Answer</button>
                    </div>
                </div>
            )
        });
        return questionListMarkup;
    }
    render() {
        return (
            <div className="row dashborad-wrapper">
                <div className="col-12 col-sm-3">
                    {this.generateCategoryList()}
                </div>
                <div className="col-12 col-sm-9 transparent-background mt-3 mt-sm-0">
                    <Details 
                        type={this.state.detailsType} 
                        selectedCategory={this.state.selectedCategory}
                        loadQuestionList={this.loadQuestionList}
                    />
                </div>
            </div>
        )
    }
}


export default Dashboard;
// Select a Category to view its questions

// -Category 1 BMW Int3 //Onclick expand list of questions and total answers
// -Category 2 Chevrolet Bolt //Onclick
// -Category 3 Kia Soul //Onclick
// -Category 4 Nissan Leaf //Onclick
// -Category 5 Tesla Model 3 //Onclick
