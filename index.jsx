class LatestCommitComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      branch: "",
      date: "",
      sha: "",
      link: ""
    };
  }

  componentDidMount() {
    fetch(
      "https://api.github.com/repos/a-curnillon/genetic-driving/branches/master"
    )
      .then(response => {
        response.json().then(json => {
          console.log(json);
          this.setState({
            author: json.commit.author.name,
            date: json.commit.commit.author.date,
          });
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div>{this.state.author}</div>
        <div>{this.state.date}</div>
      </div>
    );
  }
}

ReactDOM.render(<LatestCommitComponent />, document.getElementById("info"));
