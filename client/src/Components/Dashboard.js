// import App from './App';
//This is HOME page for components
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { categoryActions } from './../redux/actions';
import moment from 'moment';

function Details(props) {
    switch(props.type) {
    case 'static':
        return (
            <div className="text-center mt-3 font-weight-bold">
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

                {props.loadQuestionListPagination()}
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

            selectedQuestion: {},

            currentAnswerListPageNo: 1,
            currentQuestionListPageNo: 1,

            //defined to show the chronological question numbers
            questionNumberArray: [],
            answerNumberArray: [],

            selectedQuestionNumber: 1,

            perPage: 5,
            
            bg: ''
        };
    }

    changeDetails = (type, category) => {
        this.setState({
            detailsType: type,
            selectedCategory: category,
            bg: 'category-bg-'+category.Category_num
        });

        this.props.getQuestionList({
            page: 1,
            Category_num: category.Category_num,
            user_ID: this.props.user.id
        });

        this.resetQuestionListPageNumber();
        this.populateQuestionNumberArray(1);
    }

    populateQuestionNumberArray = (page) => {
        const offset = (page - 1) * this.state.perPage;
        let questionNumberArray = [];
        for (let i=1; i<=this.state.perPage; i++) {
            questionNumberArray.push(offset+i);
        }
        this.setState({
            questionNumberArray: questionNumberArray
        });
    }


    populateAnswerNumberArray = (page) => {
        const offset = (page - 1) * this.state.perPage;
        let answerNumberArray = [];
        for (let i=1; i<=this.state.perPage; i++) {
            answerNumberArray.push(offset+i);
        }
        this.setState({
            answerNumberArray: answerNumberArray
        });
    }

    // This will pull from categories array 
    generateCategoryList = () => {
        if (typeof this.props.categories == 'undefined') {
            return;
        }
        
        const categoryListMarkup = this.props.categories.map((category, index) => {
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
    showQuestionDetailModal = (question, questionNumber) => {
        this.setState({
            selectedQuestion: question,
            questionDetailModalShow: true,
            selectedQuestionNumber: questionNumber
        });

        this.props.getAnswerList({
            page: 1,
            Question_num: question.Question_num
        });

        this.populateAnswerNumberArray(1);
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
        if (typeof this.props.questionList === 'undefined') {
            return;
        }

        const questionListMarkup = this.props.questionList.data.map((question, index) => {
            return (
                <div className="row my-4" key={index}>
                    <div className="col-12 col-sm-8">
                        <div className="font-weight-bold">
                            Question {question.Question_num} {moment(question.Question_Date_Time).format('MM/DD/YYYY HH:mm')} {question.Answer_num} answers
                        </div>
                        <div className="break-word">{question.Question_descr}</div>
                    </div>
                    <div className="col-12 col-sm-2 mt-3 mt-sm-0">
                        <button onClick={(event) => this.showQuestionDetailModal(question, this.state.questionNumberArray[index])} className="btn btn-success" data-toggle="modal" data-target="modalLong">
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
        if (typeof this.props.answerList === 'undefined') {
            return;
        }        
        
        const answersMarkup = this.props.answerList.data.map((answer, index) => {
            return (
                <div className="pt-4" key={index}>
                    <div className="font-weight-bold">
                        Answer #{answer.Answer_num}: from {answer.user_firstname} on {moment(answer.Answer_Date_Time).format('MM/DD/YYYY HH:mm')}
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
        if (typeof this.props.answerList === 'undefined') {
            return;
        }
        const pageNumberArray = [...Array(this.props.answerList.noOfPages).keys()];
        const pageNumbersMarkup = pageNumberArray.map((pageNumber, index) => {
            return (
                <li className="page-item" key={index}><a onClick={(event) => this.changePageNumber(pageNumber+1)} className={'page-link '+((pageNumber+1 === this.state.currentAnswerListPageNo)?'selected':'')} href="#">{pageNumber+1}</a></li>
            );
        });

        return pageNumbersMarkup;
    }

    generateQuestionListPageNumbers = () =>  {
        if (typeof this.props.questionList === 'undefined') {
            return;
        }

        const pageNumberArray = [...Array(this.props.questionList.noOfPages).keys()];
        const pageNumbersMarkup = pageNumberArray.map((pageNumber, index) => {
            return (
                <li className="page-item" key={index}>
                    <a onClick={(event) => this.changeQuestionListPageNumber(pageNumber+1)} className={'page-link '+((pageNumber+1 === this.state.currentQuestionListPageNo)?'selected':'')} href="#">{pageNumber+1}</a>
                </li>
            );
        });

        return pageNumbersMarkup;
    }

    changePageNumber = (page) => {
        this.setState({
            currentAnswerListPageNo: page
        });

        //fetch new answer list
        this.props.getAnswerList({
            page: page,
            Question_num: this.state.selectedQuestion.Question_num
        });

        this.populateAnswerNumberArray(page);

    }

    changeQuestionListPageNumber = (page) => {
        this.setState({
            currentQuestionListPageNo: page
        });

        //fetch new question list
        this.props.getQuestionList({
            page: page,
            Category_num: this.state.selectedCategory.Category_num,
            user_ID: this.props.user.id
        });

        this.populateQuestionNumberArray(page);
    }

    resetPageNumber = () => {
        this.setState({
            currentAnswerListPageNo: 1
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
                                <div>Category {this.state.selectedCategory.Category_num}:  {this.state.selectedCategory.Category_descr}</div>
                                <div>Question submitted by: {this.state.selectedQuestion.user_firstname}</div>
                                <div>On {moment(this.state.selectedQuestion.Question_Date_Time).format('MM/DD/YYYY HH:mm')} {this.state.selectedQuestion.Answer_num} Answers</div>  
                            </div>
                            <div className="col-8 font-weight-bold">
                                <div>
                                    <div>Question #{this.state.selectedQuestion.Question_num}: </div>
                                    <div className="break-word">
                                        {this.state.selectedQuestion.Question_descr}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row border mt-2 p-3">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-12 text-right">
                                        <button onClick={(event) => this.showAnswerModal(this.state.selectedQuestion)} className="btn selected">
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
                                        {this.generatePageNumbers()}
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
                                    {this.props.user.username}, Answer Question
                                </h3>
                            </div>
                        </div>
                        <div className="row border p-3">
                            <div className="col-4 font-weight-bold">
                                <div>Category {this.state.selectedQuestion.Question_num}:  {this.state.selectedCategory.Category_descr}</div>
                                <div>Question submitted by: {this.state.selectedQuestion.user_firstname}</div>
                                <div>On {moment(this.state.selectedQuestion.Question_Date_Time).format('MM/DD/YYYY HH:mm')} {this.state.selectedQuestion.Answer_num} Answers</div>  
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
                                    {this.props.user.username}, Enter your NEW question
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


    loadQuestionListPagination = () => {
        if (typeof this.props.questionList === 'undefined' || !this.props.questionList.data.length) {
            return;
        }

        return (
            <div className="row mt-3">
                <div className="col-12 d-flex justify-content-center">
                    <nav>
                        <ul className="pagination">
                            {this.generateQuestionListPageNumbers()}
                        </ul>
                    </nav>
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
        this.props.newQuestion({
            Category_num: this.state.selectedCategory.Category_num,
            Question_descr: this.state.newQuestion,
            user_ID: this.props.user.id
        });


        //make the question empty and close the question modal
        this.setState({
            newQuestion: '',
            currentQuestionListPageNo: 1
        });
        this.closeNewQuestionModal();
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

        //validate that the questionis no longer than 200 chars
        if (question.length < 10 || question.length > 200) {
            this.setState({
                newQuestionError: 'You need to submit a question between 9 to 200 words!'
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

        //process the question
        this.props.newAnswer({
            Category_num: this.state.selectedCategory.Category_num,
            Question_num: this.state.selectedQuestion.Question_num,
            Answer_descr: this.state.newAnswer,
            user_ID: this.props.user.id
        });


        //make the question empty and close the question modal
        let selectedQuestion = this.state.selectedQuestion;
        selectedQuestion.Answer_num = selectedQuestion.Answer_num + 1;
        this.setState({
            newAnswer: '',
            selectedQuestion: selectedQuestion
        });
        this.closeAnswerModal();
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

        //validate that the answer is no longer than 200 chars
        if (answer.length > 200) {
            this.setState({
                newAnswerError: 'You can not submit an answer of more than 200 words!'
            });
            return false;
        }

        this.setState({
            newAnswerError: ''
        });


        return true;
    }

    componentDidMount = () => {
        this.props.getCategories();
    }

    componentDidUpdate = () => {
        if (this.props.newQuestionSaved) {
            this.props.getQuestionList({
                page: 1,
                Category_num: this.state.selectedCategory.Category_num,
                user_ID: this.props.user.id
            });
        }

        if (this.props.newAnswerSaved) {
            this.props.getQuestionList({
                page: 1,
                Category_num: this.state.selectedCategory.Category_num,
                user_ID: this.props.user.id
            });
            this.props.getAnswerList({
                page: 1,
                Question_num: this.state.selectedQuestion.Question_num,
            });
        }
    }
    

    render() {
        if (!this.props.loggedIn) {
          return <Redirect to='/Login' />
        }
        return (
            <div className={"row dashborad-wrapper "+this.state.bg}>
                <div className="col-12 col-sm-3">
                    {this.generateCategoryList()}
                </div>
                <div className="col-12 col-sm-9 transparent-background mt-3 mt-sm-0">
                    <Details 
                        type={this.state.detailsType} 
                        selectedCategory={this.state.selectedCategory}
                        loadQuestionList={this.loadQuestionList}
                        showNewQuestionModal={this.showNewQuestionModal}
                        loadQuestionListPagination={this.loadQuestionListPagination}
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


function mapState(state) {
    const { loggedIn, user } = state.authentication;
    const { categories, newQuestionSaved, newAnswerSaved, questionList, answerList, numberOfAnswers } = state.category;
    return { loggedIn, categories, user, newQuestionSaved, newAnswerSaved, questionList, answerList, numberOfAnswers };
}

const actionCreators = {
    getCategories: categoryActions.getCategories,
    newQuestion: categoryActions.newQuestion,
    getQuestionList: categoryActions.getQuestionList,
    newAnswer: categoryActions.newAnswer,
    getAnswerList: categoryActions.getAnswerList
}
      
export default connect(mapState, actionCreators)(Dashboard);
// Select a Category to view its questions

// -Category 1 BMW Int3 //Onclick expand list of questions and total answers
// -Category 2 Chevrolet Bolt //Onclick
// -Category 3 Kia Soul //Onclick
// -Category 4 Nissan Leaf //Onclick
// -Category 5 Tesla Model 3 //Onclick
