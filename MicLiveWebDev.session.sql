WITH Duplicates AS (
    SELECT specific_event,
        performer,
        cue_position,
        MIN(ctid) as ctid_to_keep -- ctid is a unique identifier for rows in a table
    FROM roster
    GROUP BY specific_event,
        performer,
        cue_position
    HAVING COUNT(*) > 1
)
DELETE FROM roster
WHERE ctid NOT IN (
        SELECT ctid_to_keep
        FROM Duplicates
    )
    AND (
        specific_event,
        performer,
        cue_position
    ) IN (
        SELECT specific_event,
            performer,
            cue_position
        FROM Duplicates
    );