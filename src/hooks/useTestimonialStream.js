import { useState, useEffect } from "react";
import { MOCK_TESTIMONIAL_POOL } from "../config/constants";

/**
 * Custom architectural lifecycle hook managing conversion notification intervals.
 * Shuffles randomized payout vectors completely outside primary page tracking pipelines.
 * 
 * @param {number} intervalMs - Precision timing boundary (defaults to 2000ms).
 * @returns {Object|null} Active transactional snapshot containing name, state, and naira payout.
 */
export default function useTestimonialStream(intervalMs = 2000) {
  const [activeNotification, setActiveNotification] = useState(null);

  useEffect(() => {
    const cycleNotificationPayload = () => {
      // Pick a random base candidate signature from the configuration pool array
      const randomCandidateIndex = Math.floor(Math.random() * MOCK_TESTIMONIAL_POOL.length);
      const baseCandidate = MOCK_TESTIMONIAL_POOL[randomCandidateIndex];

      // Formulate a dynamic, randomized payout withdrawal amount in standard increments (₦5,000 - ₦150,000)
      const dynamicPayoutAmount = Math.floor(Math.random() * 29 + 1) * 5000;

      // Commit the isolated localized atomic value token state properties
      setActiveNotification({
        id: `${Date.now()}-${randomCandidateIndex}`,
        name: baseCandidate.name,
        state: baseCandidate.state,
        amount: dynamicPayoutAmount
      });
    };

    // Instantiate immediate hydration value pass
    cycleNotificationPayload();

    // Attach native background timing thread execution loops
    const activeTimerId = setInterval(cycleNotificationPayload, intervalMs);

    // Destruct the thread hook memory allocation footprint cleanly on layout unmounts
    return () => clearInterval(activeTimerId);
  }, [intervalMs]);

  return activeNotification;
}
