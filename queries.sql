-- Question History Query
SELECT *
FROM questions
ORDER BY date DESC;
-- Aggregate Donation Queries
SELECT SUM(amount) AS total_raised,
    COUNT(*) AS total_donors
FROM donations;
SELECT *
FROM donations
ORDER BY date DESC;