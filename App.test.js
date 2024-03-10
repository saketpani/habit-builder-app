import react from "react";
import { render } from "react-native-testing-library";
import About from './components/About';
import Greeting from "./components/Greeting";
import Quote from "./components/Quote";
import Separator from './components/Separator';
import { newGuid, areDatePartEqual, formattedDate } from "./components/Helper";


describe("About Tests", () => {
  it("should match snapshot", () => {
    const snap = render(<About />).toJSON();
    expect(snap).toMatchSnapshot();
  }); 
});

describe("Greeting Tests", () => {
  it("should match snapshot", () => {
    const snap = render(<Greeting />).toJSON();
    expect(snap).toMatchSnapshot();
  }); 
});

describe("Quote Tests", () => {
  it("should match snapshot", () => {
    const snap = render(<Quote />).toJSON();
    expect(snap).toMatchSnapshot();
  }); 
});

describe("Separator Tests", () => {
  it("should match snapshot", () => {
    const snap = render(<Separator />).toJSON();
    expect(snap).toMatchSnapshot();
  }); 
});


describe("Helper Tests", () => {
  it("newGuid() helper function should return a string with 32 char length.", () => {
    const guidValue = newGuid();
    expect(guidValue).toHaveLength(36);
  }); 

  it("areDatePartEqual() helper function should match.", () => {
    const dateStr = new Date().toDateString();
    const date1 = new Date(dateStr);
    const date2 = new Date();
    const isMatched = areDatePartEqual(date1, date2);
    expect(isMatched).toBe(true);
  }); 

  it("formattedDate() helper function should return a string with - char.", () => {    
    const dateStr = formattedDate(new Date());    
    expect(dateStr).toContain("-");
  }); 
});


