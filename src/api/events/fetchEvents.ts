import axios from "axios";
import { TimeEvent } from "../../types/TimeEvent";

//create process.env.PUBLIC_URL then
const baseURL = "https://ueni-ltd.github.io/ueni_challenge";

function fetchEvents() {
  return axios.get<TimeEvent[]>(`${baseURL}/events.json`);
}

export default fetchEvents;
