let expences = [
      {description: "Groceries", amount: 50, category: "Food"},
      {description: "Electricity Bill", amount: 100, category: "Utilities"},
      {description: "Dinner", amount: 30, category: "Food"},
      {description: "Internet Bill", amount: 150, category: "Utilities"},
]

let expenceReport = expences.reduce(
      (report, expences) => {
            report[expences.category] += expences.amount

            // report[expences.category] += ()
            return report
      }, 
      {Food: 0, Utilities: 0}
)

// console.log(expenceReport)

let tasks = [
	{ description: "Write report", completed: false, priority: 2},
	{ description: "Send email", completed: true, priority: 3},
	{ description: "Prepare presentation", completed: false, priority: 1},
];

let pendingSortedTasks = tasks.filter((task) => !task.completed).sort((a, b) => a.priority - b.priority)

// console.log(pendingSortedTasks)

let movieRatings = [
      { title: "Movie A", ratings: [4, 5, 3]},
      { title: "Movie B", ratings: [5, 5, 4]},
      { title: "Movie C", ratings: [3, 4, 2]},
]

let avgRatings = movieRatings.map((movie) => {
      let sum = movie.ratings.reduce((sum, rating) => sum + rating, 0)
      let avg = sum / movie.ratings.length

      return {title: movie.title, avgRating: avg.toFixed(2)}
})

// console.log(avgRatings)

