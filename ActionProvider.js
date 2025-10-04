// src/components/ActionProvider.js
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleAppointmentHelp = () => {
    const msg = this.createChatBotMessage(
      "To book an appointment, select a doctor, date, and available time slot. Fill your details and click 'Submit Appointment'."
    );
    this.addMessageToState(msg);
  };

  handleDoctorInfo = () => {
    const msg = this.createChatBotMessage(
      "We have experienced doctors across multiple specializations like Cardiology, Pediatrics, Neurology, and more."
    );
    this.addMessageToState(msg);
  };

  handleUnknown = () => {
    const msg = this.createChatBotMessage(
      "I'm not sure how to help with that. Try asking about appointments or doctors. 😊"
    );
    this.addMessageToState(msg);
  };

  addMessageToState = (msg) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, msg],
    }));
  };
}

export default ActionProvider;
