const billAmtInput = document.getElementById('billAmt')
const tipPercInput = document.getElementById('tipPerc')
const noOfPlpInput = document.getElementById('noOfPlp')
const calculateTipBtn = document.getElementById('calculateTipBtn')
const totalTipDisplay = document.getElementById('totalTip')
const tipPerPersonDisplay = document.getElementById('tipPerPerson')

function calculateTip() {
    const totalBill = parseFloat(billAmtInput.value)
    const tipPerc = parseFloat(tipPercInput.value)
    const noOfPlp = parseInt(noOfPlpInput.value)

    if(isNaN(totalBill) || isNaN(tipPerc) || isNaN(noOfPlp)) {
        totalTipDisplay.textContent = 'Enter valid inputes'
        tipPerPersonDisplay.textContent = ''
        return
    }

    const totalTip = ((totalBill * tipPerc) / 100).toFixed(2)
    const tipPerPerson = (totalTip / noOfPlp).toFixed(2)

    totalTipDisplay.textContent = `Total Tip: $${totalTip}`
    tipPerPersonDisplay.textContent = `Tip Per Person: $${tipPerPerson}`
}

calculateTipBtn.addEventListener('click', calculateTip)