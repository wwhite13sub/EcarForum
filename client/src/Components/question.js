

class App extends Component {

    state = {
      questions: [],
      question: {
        
      }
    }
  
    componentDidMount() {
      this.getQuestion();
    }
  
    getQuestions = _ => {
      fetch('http://localhost:4000/api/questions') ///or axios.get---install axios
      .then(response => response.json())
      .then(response => this.setState({ questions: response.data }))
      .catch(err => console.error(error))
    }
  
    addQuestion = _ => {
  
    }
    
    render() {
      const { questions } = this.state;
      return (
        <div className="App">
          { questions.map(this.renderQuestion)}
        </div>
      );
    }  
  }
