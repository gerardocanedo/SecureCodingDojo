const qna = require("../qna");
const util = require("../util");
const assert = require("assert");

describe("qna", () => {

  describe("crypto", () => {

    test("false for incorrect code",()=>{
      let text = "PLAIN_TEXT";
      for(let alg in qna.DEFS){
        let res = qna.getCode(alg,text);
        let wrong = "1234";
        let check = qna.checkCode(wrong, res.digest);
        assert(check === false, `Validation passed for wrong text using ${alg}`);
      }
      
    });

    test("true for correct code",()=>{
      let text = "PLAIN_TEXT";
      for(let alg in qna.DEFS){
        let res = qna.getCode(alg,text);
        let check = qna.checkCode(text, res.digest);
        assert(check === true, `Validation failed for correct text using ${alg}`);
      }
    });


    test("vignere should return plain text for 'AAA'",()=>{
      let text = "PLAIN TEXT";
      let expected = "BYOUA HQKH"
      let key = "MNO"
      let res = qna.getCode("vignere",text,key);
      assert.strictEqual(res.code, expected, "Did not result in the same cipher for key: 'MNO'");

    });

    test("xorOp should return plain text for '0x0'",()=>{
      let text = "PLAIN TEXT";
      let expected = "50 4C 41 49 4E 20 54 45 58 54";
      let keyArray = [0];
      let cipher = qna.xorOp(text,keyArray)
      assert.strictEqual(cipher, expected, "Did not result in the same cipher for key: '0x0'");

    });

  });


});