-- 1. Display today's question
SELECT * FROM questions ORDER BY date DESC LIMIT 1;

-- 2. Fetch response history with question details
SELECT r.participant_name, r.answer, q.question 
FROM responses r 
JOIN questions q ON r.question_id = q.id 
ORDER BY r.id DESC;

-- 3. Calculate donation totals and count
SELECT 
    COUNT(id) AS total_donors, 
    SUM(amount) AS total_raised 
FROM donations;

-- 4. Delete an incorrect record
DELETE FROM donations WHERE id = 1;
