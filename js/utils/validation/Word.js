import axios from "axios";

const options = {
  method: "POST",
  url: "https://neutrinoapi-bad-word-filter.p.rapidapi.com/bad-word-filter",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "x-rapidapi-key": "b1d0487589msh6adef2e414038fap17292djsneb5826782731",
    "x-rapidapi-host": "neutrinoapi-bad-word-filter.p.rapidapi.com"
  },
  data: { "censor-character": "*", content: "fuck" }
};

class WordService {
  /**
   * @param {string} word
   * @returns {boolean} validation result
   */
  static isValid(word) {
    try {
      return word.isBad().isLong();
    } catch (e) {
      return false;
    }
  }
  /**
   * @param {string} text
   * @returns {string} sanitized word
   */
  isBad(text) {
    // validate,  throw error
    return text;
  }
  /**
   * Return the text on condition : whether it's too Long
   * @param {string} text
   * @returns {string} sanitized word
   */
  isLong(text, threshold = 24) {
    // validate , throw error
    return text;
  }
}
