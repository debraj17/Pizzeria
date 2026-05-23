import React from 'react';
import Pizza from './Pizza-1.jpg'
import Chef from "./chef.jpg"
import Time from "./time.jpg"

function Home() {
  return (
    <div className="container">

      {/* Our Story Section */}
      <div className="row mt-4">
        <div className="col-12">
          <h2 className='text-center'>Our story</h2>
          <p>We believe in good. We launched Fresh Pan Pizza Best Excuse Awards on our Facebook fan page. Fans were given situations where they had to come up with wacky and fun excuses. The person with the best excuse won the Best Excuse Badge and won Pizzeria's vouchers. Their enthusiastic
          response proved that Pizzeria's Fresh Pan Pizza is the Tastiest Pan Pizza. Ever!</p>
          <p>Ever since we launched the Tastiest Pan Pizza, ever, people have not been able to resist the softest, cheesiest, crunchiest, butteriest Domino's Fresh Pan Pizza. They have been leaving the stage in the middle of a performance and even finding excuses to be disqualified in a football match.</p>
          <p>We launched Fresh Pan Pizza Best Excuse Awards on our Facebook fan page. Fans were given situations where they had to come up with wacky and
          fun excuses. The person with the best excuse won the Best Excuse Badge and won Domino's vouchers. Their enthusiastic response proved that
          Pizzeria's Fresh Pan Pizza is the Tastiest Pan Pizza. Ever!</p>
        </div>
      </div>

      {/* Ingredients Section */}
      <div className="row mt-4">
        <div className="col-6">
          <img src={Pizza} alt="ingredients" className="img-fluid" />
        </div>
        <div className="col-6">
          <h2>Ingredients</h2>
          <p>We're ruthless about goodness. We have no qualms about tearing up a
          day-old lettuce leaf (straight from the farm), or steaming a baby (carrot).
          Cut. Cut. Chop. Chop. Steam. Steam. Stir Stir. While they're still young
          and fresh - that's our motto. It makes the kitchen a better place</p>
        </div>
      </div>

      {/* Our Chefs Section */}
      <div className="row mt-4">
        <div className="col-6">
          <h2>Our Chefs</h2>
          <p>They make sauces sing and salads dance. They create magic with skill,
          knowledge, passion, and stirring spoons (among other things). They
          make goodness so good, it doesn't know what to do with itself. We do
          though. We send it to you.</p>
        </div>
        <div className="col-6">
          <img src={Chef} alt="chefs" className="img-fluid" />
        </div>
      </div>

      {/* Delivery Section */}
      <div className="row mt-4 mb-4">
        <div className="col-6">
          <img src={Time} alt="delivery" className="img-fluid" />
        </div>
        <div className="col-6">
          <h2>30 MINUTES OR FREE PIZZA</h2>
          <p>We deliver your pizza hot and fresh within 30 minutes.</p>
          <p>30 minutes delivery guarantee not applicable on New years eve,on Ganesh festival , Christmas and Durga Pooja , the service guarantee may be withdrawn temporarily in view of difficult operating conditions for delivery. Conditions apply.</p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-4 mb-2">
        <p style={{color: 'orange'}}>Debraj Ghosh C21805211 2026 Demo Project Pizzeria</p>
      </div>

    </div>
  );
}

export default Home;