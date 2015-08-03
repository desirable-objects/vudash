module.exports = {
  dimensions: {
    rows: 1.2,
    columns: 1
  },
  template: {
    html: `
    <h3>Team Norms</h3>
    <span class="team-norms">{{norm}}</span>
    `,
    css: `
    .team-norms {
      font-size: 22px;
      width: 70%;
      display: block;
      margin: auto;
    }
    `,
    model: {
      norm: "Treat each other with dignity and respect."
    }
  },
  job: {
    schedule: 1000 * 60 * 15,
    variables: {
      norms: ["Treat each other with dignity and respect.",
              "Transparency: avoid hidden agendas.",
              "Be genuine with each other about ideas, challenges, and feelings.",
              "Trust each other. Have confidence that issues discussed will be kept in confidence.",
              "Managers will open up a space in which people have information and are comfortable asking for what they need.",
              "Team members will practice a consistent commitment to sharing all the information they have. Share the complete information that you have up front.",
              "Listen first to understand, and don’t be dismissive of the input received when we listen.",
              "Practice being open-minded.",
              "Don’t be defensive with your colleagues.",
              "Rather than searching for the guilty, give your colleagues the benefit of the doubt; have a clean slate process.",
              "Support each other - don't throw each other under the bus.",
              "Avoid territoriality; think instead of the overall good for the company, our employees, and our customers.",
              "The discussion of issues, ideas, and direction will not become a personal attack or return to haunt you in the future.",
              "Managers are open, communicative, and authentic with each other and their teams.",
              "It's okay to not know the right answer, and to admit it. The team can find the answer.",
              "Problems are presented in a way that promotes mutual discussion and resolution.",
              "It is safe to be wrong as a manager. Thoughtful decision making is expected.",
              "Own the whole implementation of the product, not just your little piece; recognize that you are part of something larger than yourself. Be responsible to own the whole picture.",
              "Practice and experience humility - each of us may not have all the answers.",
              "If you commit to doing something – do it. Be accountable and responsible to the team.",
              "It is okay to be the messenger with bad news. You can expect a problem solving approach, not recrimination.",
              "Promise to come prepared to your meetings and projects so that you demonstrate value and respect for the time and convenience of others.",
              "Strive to continuously improve and achieve the team's strategic goals. Don't let ineffective relationships and interactions sabotage the team's work."]
    },
    script: function(emit, widget) {

      var norms = widget.job.variables.norms;
      var random = Math.ceil(Math.random() * (norms.length - 1));
      emit({mention: norms[random]});

    }
  }
}
