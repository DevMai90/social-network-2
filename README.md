# social-network-2

Updated version of Brad Tarversy's course with additional features.

This is a second go-around with Brad's MERN stack course. This updated version integrates hooks and using async/await to handle promises.

Expanded on the application with the following:

- Added Edit Experience functionality and routes.
- Added Edit Education functionality and routes.
- Added alerts after updating experience/education.
- Sorted education and experience by current status first followed by past experience/education in descending order.
- Added profile view count to Profile model.
- Added modal to confirm deleting account instead of regular JS alert() function.
- Sort experience and education by most recent current first followed by past exp/edu in descending order.
- Fixed date bug caused by react-moment parsing dates in local time instead of UTC.
- Add member since date extracted from User model.
- Add date stamp on posts and post edits.
