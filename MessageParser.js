// src/components/MessageParser.js
class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowercase = message.toLowerCase();

    if (lowercase.includes("appointment")) {
      this.actionProvider.handleAppointmentHelp();
    } else if (lowercase.includes("doctor") || lowercase.includes("specialist")) {
      this.actionProvider.handleDoctorInfo();
    } else {
      this.actionProvider.handleUnknown();
    }
  }
}

export default MessageParser;
