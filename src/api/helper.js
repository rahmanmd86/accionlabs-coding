    
function getSum(cards) {
    let sum = 0, card;
    for (card of cards) {
        if (['JACK','QUEEN','KING'].includes(card.value)) {
            sum += 10
        }
        else if (['ACE'].includes(card.value)) {
            sum += 11
            if (sum > 21) {
                sum -= 10
            }
        }
        else {
            sum += parseInt(card.value)
        }     
    }
    return sum
}

export function getClosest21(cards) {
    let card, sums = [],
    goal = 21;
    for (card of cards){
        sums.push(getSum(card))
    }
    var closest = sums.reduce(function(prev, curr) {
        return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
    });
    return sums.indexOf(closest)+1
}