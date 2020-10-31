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
                        <button onClick={props.showNewQuestionModal} className="btn selected new-question">
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


                <div className="row mt-3">
                    <div className="col-12 d-flex justify-content-center">
                        <nav>
                            <ul className="pagination">
                                <li className="page-item">
                                    <a className="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                </li>
                                {props.generateQuestionListPageNumbers()}
                                <li className="page-item">
                                    <a className="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
    
}


class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            questionDetailModalShow:false,
            answerModalShow:false,
            newQuestionModalShow:false,

            //these states will be responsible for new question input
            newQuestion: '',
            newQuestionError: '',

            //these states will be responsible for new answer input
            newAnswer: '',
            newAnswerError: '',

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
            questionList: {
                data: [
                    {
                        Category_num: 1,
                        Question_num: 1,
                        user: {
                            user_firstname: 'Wanda 1'
                        },
                        Question_Date_Time: '11/11/2020 16:12',
                        Answer_num: 3,
                        Question_descr: 'What is cost?'
                    },
                    {
                        Category_num: 1,
                        Question_num: 2,
                        user: {
                            user_firstname: 'Wanda 2'
                        },
                        Question_Date_Time: '11/13/2020 16:12',
                        Answer_num: 4,
                        Question_descr: 'What are the colors?'
                    },
                    {
                        Category_num: 1,
                        Question_num: 3,
                        user: {
                            user_firstname: 'Wanda 1'
                        },
                        Question_Date_Time: '11/15/2020 16:12',
                        Answer_num: 1,
                        Question_descr: 'Is it fast?'
                    },
                    {
                        Category_num: 1,
                        Question_num: 4,
                        user: {
                            user_firstname: 'Wanda 3'
                        },
                        Question_Date_Time: '11/20/2020 16:12',
                        Answer_num: 8,
                        Question_descr: 'Will it make me sexy?'
                    },
                    {
                        Category_num: 1,
                        Question_num: 5,
                        user: {
                            user_firstname: 'Wanda 5'
                        },
                        Question_Date_Time: '11/13/2020 16:12',
                        Answer_num: 3,
                        Question_descr: 'Am I awesome?'
                    }
                ],
                noOfPages: 3
            },

            selectedQuestion: {},

            questionAnswers: {
                data: [
                    {
                        Answer_num: 1,
                        user: {
                            user_firstname: 'Wanda 1'
                        },
                        Answer_Date_Time: '7/3/2020 14:00:01',
                        Answer_descr: 'Cost is $5000, go ahead buy now or loose it. Cost is $5000, go ahead buy now or loose it. Cost is $5000, go ahead buy now or loose it. Cost is $5000, go ahead buy now or loose it. Cost is $5000, go ahead buy now or loose it.'
                    },
                    {
                        Answer_num: 2,
                        user: {
                            user_firstname: 'Wanda 2'
                        },
                        Answer_Date_Time: '7/2/2020 14:00:01',
                        Answer_descr: 'Cost is $5000, go ahead buy now or loose it. Cost is $5000, go ahead buy now or loose it. Cost is $5000, go ahead buy now or loose it. Cost is $5000, go ahead buy now or loose it. Cost is $5000, go ahead buy now or loose it.'
                    },
                    {
                        Answer_num: 3,
                        user: {
                            user_firstname: 'Wanda 3'
                        },
                        Answer_Date_Time: '7/1/2020 14:00:01',
                        Answer_descr: 'Cost is $5000, go ahead buy now or loose it. Cost is $5000, go ahead buy now or loose it. Cost is $5000, go ahead buy now or loose it. Cost is $5000, go ahead buy now or loose it. Cost is $5000, go ahead buy now or loose it.'
                    }
                ],
                noOfPages: 4
            },

            currentQuestionAnswersPageNo: 1,
            currentQuestionListPageNo: 1
        };
    }

    changeDetails = (type, category) => {
        this.setState({
            detailsType: type,
            selectedCategory: category
        });

        this.resetQuestionListPageNumber();
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

   //These functions return true or false depending on "actions"
    showQuestionDetailModal = (question) => {
        console.log(question);
        this.setState({
            selectedQuestion: question,
            questionDetailModalShow: true
        })
    }

    closeQuestionDetailModal = () => {
        this.setState({
            questionDetailModalShow: false
        })

        this.resetPageNumber();
    }

    showAnswerModal = (question) => {
        this.setState({
            selectedQuestion: question,
            answerModalShow: true
        })
    }

    closeAnswerModal = () => {
        this.setState({
            answerModalShow: false
        })
    }

    showNewQuestionModal = () => {
        this.setState({
            newQuestionModalShow: true
        })
    }

    closeNewQuestionModal = () => {
        this.setState({
            newQuestionModalShow: false
        })
    }


    //this will loop new questions list 
    loadQuestionList = () => {
        const questionListMarkup = this.state.questionList.data.map((question, index) => {
            return (
                <div className="row my-4" key={index}>
                    <div className="col-12 col-sm-8">
                        <div>
                            Question {question.Question_num} {question.Question_Date_Time} {question.Answer_num} answers
                        </div>
                        <div>{question.Question_descr}</div>
                    </div>
                    <div className="col-12 col-sm-2 mt-3 mt-sm-0">
                        <button onClick={(event) => this.showQuestionDetailModal(question)} className="btn btn-success" data-toggle="modal" data-target="modalLong">
                            View
                        </button>
                    </div>
                    <div className="col-12 col-sm-2 mt-3 mt-sm-0">
                        <button onClick={(event) => this.showAnswerModal(question)} className="btn btn-success">Answer</button>
                    </div>
                </div>
            )
        });
        return questionListMarkup;
    }

    populateAnswers = () => {
        const answersMarkup = this.state.questionAnswers.data.map((answer, index) => {
            return (
                <div className="pt-4" key={index}>
                    <div className="font-weight-bold">
                        Answer #{answer.Answer_num}: from {answer.user.user_firstname} on {answer.Answer_Date_Time}
                    </div>
                    <div>
                        {answer.Answer_descr}
                    </div>
                </div>
            );
        });

        return answersMarkup;
    }


    generatePageNumbers = () =>  {
        const pageNumberArray = [...Array(this.state.questionAnswers.noOfPages).keys()];
        console.log('pageNumberArray', pageNumberArray);
        const pageNumbersMarkup = pageNumberArray.map((pageNumber) => {
            return (
                <li className="page-item"><a onClick={(event) => this.changePageNumber(pageNumber+1)} className={'page-link '+((pageNumber+1 === this.state.currentQuestionAnswersPageNo)?'selected':'')} href="#">{pageNumber+1}</a></li>
            );
        });

        return pageNumbersMarkup;
    }

    generateQuestionListPageNumbers = () =>  {
        const pageNumberArray = [...Array(this.state.questionList.noOfPages).keys()];
        console.log('pageNumberArray', pageNumberArray);
        const pageNumbersMarkup = pageNumberArray.map((pageNumber) => {
            return (
                <li className="page-item"><a onClick={(event) => this.changeQuestionListPageNumber(pageNumber+1)} className={'page-link '+((pageNumber+1 === this.state.currentQuestionListPageNo)?'selected':'')} href="#">{pageNumber+1}</a></li>
            );
        });

        return pageNumbersMarkup;
    }

    changePageNumber = (page) => {
        this.setState({
            currentQuestionAnswersPageNo: page
        })
    }

    changeQuestionListPageNumber = (page) => {
        this.setState({
            currentQuestionListPageNo: page
        })
    }

    resetPageNumber = () => {
        this.setState({
            currentQuestionAnswersPageNo: 1
        })
    }

    resetQuestionListPageNumber = () => {
        this.setState({
            currentQuestionListPageNo: 1
        })
    }

    //This shows content of Modal 
    questionDetailModal = () => {
        if (!this.state.questionDetailModalShow) {
            return;
        }

        return (
            <div className="modal-container row px-5">
                <div className="col-12 mt-5">
                    <div className="modal-content p-5 mt-5 bg-white">
                        <div className="row mb-3">
                            <div className="col-12 pl-0">
                                <button onClick={this.closeQuestionDetailModal} className="btn bg-danger text-white">
                                    Return to Dashboard
                                </button>
                            </div>
                        </div>
                        <div className="row border p-3">
                            <div className="col-4 font-weight-bold">
                                <div>Category {this.state.selectedQuestion.Question_num}:  {this.state.selectedCategory.Category_descr}</div>
                                <div>Question submitted by: {this.state.selectedQuestion.user.user_firstname}</div>
                                <div>On {this.state.selectedQuestion.Question_Date_Time} {this.state.selectedQuestion.Answer_num} Answers</div>  
                            </div>
                            <div className="col-8 font-weight-bold">
                                <div>
                                    Question #{this.state.selectedQuestion.Question_num}: {this.state.selectedQuestion.Question_descr}
                                </div>
                            </div>
                        </div>

                        <div className="row border mt-2 p-3">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-12 text-right">
                                        <button onClick={this.showAnswerModal} className="btn selected">
                                            Answer
                                        </button>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        {this.populateAnswers()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-12 d-flex justify-content-center">
                                <nav>
                                    <ul className="pagination">
                                        <li className="page-item">
                                            <a className="page-link" href="#" aria-label="Previous">
                                                <span aria-hidden="true">&laquo;</span>
                                                <span className="sr-only">Previous</span>
                                            </a>
                                        </li>
                                        {this.generatePageNumbers()}
                                        <li className="page-item">
                                            <a className="page-link" href="#" aria-label="Next">
                                                <span aria-hidden="true">&raquo;</span>
                                                <span className="sr-only">Next</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    answerModal = () => {
        if (!this.state.answerModalShow) {
            return;
        }

        return (
            <div className="modal-container answer-modal row px-5">
                <div className="col-12 mt-5">
                    <div className="modal-content p-5 mt-5 bg-white">
                        <div className="row mb-3">
                            <div className="col-12 pl-0">
                                <h3>
                                    Username, Answer Question
                                </h3>
                            </div>
                        </div>
                        <div className="row border p-3">
                            <div className="col-4 font-weight-bold">
                                <div>Category {this.state.selectedQuestion.Question_num}:  {this.state.selectedCategory.Category_descr}</div>
                                <div>Question submitted by: {this.state.selectedQuestion.user.user_firstname}</div>
                                <div>On {this.state.selectedQuestion.Question_Date_Time} {this.state.selectedQuestion.Answer_num} Answers</div>  
                            </div>
                            <div className="col-8 font-weight-bold">
                                <div>
                                    Question #{this.state.selectedQuestion.Question_num}: {this.state.selectedQuestion.Question_descr}
                                </div>
                            </div>
                        </div>

                        <div className="row border mt-2 p-3">
                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="answer">Answer the Question</label>
                                    <textarea onChange={this.newAnswerHandler} className="form-control" id="answer" rows="10"></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 text-danger">
                                {this.state.newAnswerError}
                            </div>
                        </div>

                        <div className="row mt-2 p-3">
                            <div className="col-12">
                                <div className="d-flex justify-content-between">
                                    <button onClick={this.submitAnswer} className="btn selected text-white">
                                        SUBMIT
                                    </button>
                                    <button onClick={this.closeAnswerModal} className="btn bg-danger text-white">
                                        CANCEL
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    newQuestionModal = () => {
        if (!this.state.newQuestionModalShow) {
            return;
        }

        return (
            <div className="modal-container row px-5">
                <div className="col-12 mt-5">
                    <div className="modal-content p-5 mt-5 bg-white">
                        <div className="row mb-3">
                            <div className="col-12 pl-0">
                                <h3>
                                    Username, Enter your NEW question
                                </h3>
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-12 pl-0">
                                <div>
                                    <h3>Category: {this.state.selectedCategory.Category_descr}</h3>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-12 pl-0">
                                <div className="form-group">
                                    <label htmlFor="answer">Ask the Question</label>
                                    <textarea onChange={this.newQuestionHandler} className="form-control" id="answer" rows="10"></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 text-danger">
                                {this.state.newQuestionError}
                            </div>
                        </div>

                        <div className="row mt-2 p-3">
                            <div className="col-12">
                                <div className="d-flex justify-content-between">
                                    <button onClick={this.submitQuestion} className="btn selected text-white">
                                        SUBMIT
                                    </button>
                                    <button onClick={this.closeNewQuestionModal} className="btn bg-danger text-white">
                                        CANCEL
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    newQuestionHandler = (event) => {
        this.setState({
            newQuestion: event.target.value
        })
    }

    submitQuestion = () => {
        if (!this.validateNewQuestion()) {
            return;
        }

        //process the question
        this.setState({
            newQuestion: ''
        });
        alert('Your question has been asked');
    }

    validateNewQuestion = () => {
        const question = this.state.newQuestion;

        //validate that the question textbox is not empty
        if (!question.length) {
            this.setState({
                newQuestionError: 'You can not submit an empty question!'
            });
            return false;
        }

        //validate that question is ending with ?
        const lastChar = question.substr(-1);
        if (lastChar !== '?') {
            this.setState({
                newQuestionError: 'You need to end your question with a "?"'
            });
            return false;
        }


        this.setState({
            newQuestionError: ''
        });


        return true;
    }




    newAnswerHandler = (event) => {
        this.setState({
            newAnswer: event.target.value
        })
    }

    submitAnswer = () => {
        if (!this.validateNewAnswer()) {
            return;
        }

        //process the answer
        this.setState({
            newAnswer: ''
        });
        alert('Your Answer has been subnitted');
    }

    validateNewAnswer = () => {
        const answer = this.state.newAnswer;

        //validate that the answer textbox is not empty
        if (!answer.length) {
            this.setState({
                newAnswerError: 'You can not submit an empty answer!'
            });
            return false;
        }

        this.setState({
            newAnswerError: ''
        });


        return true;
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
                        showNewQuestionModal={this.showNewQuestionModal}
                        generateQuestionListPageNumbers={this.generateQuestionListPageNumbers}
                    />
                </div>

                {/* moda  markup */}
                {this.questionDetailModal()}
                {this.answerModal()}
                {this.newQuestionModal()}
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
