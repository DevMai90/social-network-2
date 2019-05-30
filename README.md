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

/\*

children:
"12/31/89"
dateTime:
Moment{…}
**proto**:
{…}
\_d:
Sun Dec 31 1989 16:00:00 GMT-0800 (Pacific Standard Time)
\_f:
"YYYY-MM-DDTHH:mm:ss.SSSSZ"
\_i:
"1990-01-01T00:00:00.000Z"

\_isAMomentObject:
true

\_isUTC:
false

\_isValid:
true
\_l:
"en"
\_locale:
Locale{…}
\_pf:
{…}
\_tzm:
0

From the docs, moment parses and displays in local time.
Therefore we need to ignore \_d
Use momement.utc() to set it to utc format.

children:
"01/01/90"
dateTime:
Moment{…}
**proto**:
{…}
\_d:
Sun Dec 31 1989 16:00:00 GMT-0800 (Pacific Standard Time)
\_f:
"YYYY-MM-DDTHH:mm:ss.SSSSZ"
\_i:
"1990-01-01T00:00:00.000Z"

\_isAMomentObject:
true

\_isUTC:
true

\_isValid:
true
\_locale:
Locale{…}
\_offset:
0
\_pf:
{…}
\_tzm:
0
\*/
