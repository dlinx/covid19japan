import axios from 'axios'

export const getSummary = () => axios.get('https://data.covid19japan.com/summary/latest.json')