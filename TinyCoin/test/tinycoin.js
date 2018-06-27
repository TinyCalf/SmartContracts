var TinyCoin = artifacts.require("./TinyCoin.sol")

contract("TinyCoin", function(accounts) {
	it("should put 10000 tinycoin in the first account", function(){
		return TinyCoin.deployed().then(function(instance) {
			return instance.balanceOf.call(accounts[0]);
		})
		.then(balance=>{
			balance = web3.fromWei(balance) 
			assert.equal(	balance, 10000)
		})
	})
	it(`should succeed in a transfer
      * status should be 0x1
      * should have a Transfer event with correct output` , ()=>{
		return TinyCoin.deployed().then( instance=>{
			return instance.transfer(accounts[1],web3.toWei(10),{from:accounts[0]})
		})
		.then(ret=>{
			assert.equal(ret.receipt.status, "0x1", `expect status to be 0x1`)
			var eventTransfer = null
			for (var i = 0; i < ret.logs.length; i++) {
    		var log = ret.logs[i];
				if(log.event == "Transfer")
							eventTransfer = log
			}
			//should have new event
			assert(eventTransfer != null, 'except event to be Transfer')
			//should have correct to,from and value 
			assert.equal(eventTransfer.args.from, accounts[0], `expect from to be account0`)
			assert.equal(eventTransfer.args.to, accounts[1], `expect to to be account1`)
			assert.equal(eventTransfer.args.value, web3.toWei(10), `expect value to be 1000`)
		})
	})
})
