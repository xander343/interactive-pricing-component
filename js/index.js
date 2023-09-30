// Access the slider input field
const slider = document.querySelector("#slider")

// Access the input field for yearly or monthly plan
const toggle = document.querySelector("#billing-rate")


// Access the pageview content and the price as well
const pageviews = document.querySelector(".pageviews")
const pricing = document.querySelector(".pricing")

// Get the rate whether per month or per annum
const chargeRate = document.querySelector(".charge-rate")

// Access the discount class
const discount = document.querySelector(".discount")

// Initialize the rates
let monthly = true
let yearly = false

// Create an object with the details of the pricing as followers : price
const pricingScheme = {
    "10K" : 8,
    "50K" : 12,
    "100K" : 16,
    "500K": 24,
    "1M" : 36
}

// Get the followers only in an array
const allPrices = Object.keys(pricingScheme)


// Get discounted price
const discounted = (n) => {
    return n*12*0.75
}


// Calculate price to display on screen and displays it
const updatePricing = (value) => {
    let i
    // Access array value based on the range value
    switch (value) {
        case "0" : i = 0; break;
        case "25" : i = 1; break;
        case "50" : i = 2; break;
        case "75" : i = 3; break;
        case "100" : i = 4; break;
    }

    // Get the follower count and price at that range
    let followerCount = allPrices[i]
    let price = pricingScheme[followerCount];

    // Update the screen content
    pageviews.textContent = followerCount
    if (monthly) {
        pricing.textContent = `$${price}`
    }
    else {
        pricing.textContent = `$${discounted(price)}`
    }
}



// Update length of slider bar upon dragging
slider.addEventListener("input", () => {
    // Define the background linear gradient
    let color = `linear-gradient(90deg, hsl(174, 86%, 45%) ${slider.value}%, hsl(224, 65%, 95%) ${slider.value}%)`

    // Set the slider new color
    slider.style.background = color;

    // Update content based off the slider
    updatePricing(slider.value)
})


// Add event listener to update for every toggle input
toggle.addEventListener("input", () => {
    // Invert the rate of calculation
    if (toggle.checked) {
        yearly = true, monthly = false
        chargeRate.textContent = "/year"
        // Show discount part
        discount.style.display = "block"
    }
    else {
        yearly = false, monthly = true
        chargeRate.textContent = "/month"
        discount.style.display = "none"
    }
    // Update the content
    updatePricing(slider.value)
})


// Catch breakpoint by looking at the cta display property
if (document.querySelector(".cta").style.display == "block") {
    discount.textContent = "25%"
    console.log("Here?")
}
else {
    discount.textContent = "25% discount"
}