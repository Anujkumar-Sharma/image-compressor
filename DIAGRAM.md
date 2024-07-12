+--------------------------+                  +--------------------------+
|      Client              |                  |     Node.js Server       |
+-----------+--------------+                  +------------+-------------+
            |                                                 |
            | 1. Upload CSV File                              |
            +------------------------------------------------>+
            |                                                 |
            |                                                 v
            |                                +-----------------------------+
            |                                | Upload API                  |
            |                                | - Validate CSV              |
            |                                | - Generate requestId        |
            |                                | - Save request and products |
            |                                | - Return requestId          |
            +<-------------------------------------------------------------+
            |                                                 |
            |                                                 v
            |                                +----------------------------------+
            |                                | Async Image Processing           |
            |                                | - Update status to 'processing'  |
            |                                | - Compress images (50%)          |
            |                                | - Save processed images          |
            |                                | - Generate output CSV            |
            |                                | - Update status to 'completed'   |
            |                                | - Trigger webhook (optional)     |
            +<------------------------------------------------------------------+
            |                                                 |
            |                                                 v
            |                                +-----------------------------+
            |                                | Webhook Service             |
            |                                | - Send POST request to      |
            |                                |   provided webhook URL      |
            +<-------------------------------------------------------------+
            |                                                 |                                            
            | 2. Status Check API                             |
            +------------------------------------------------>+                                           
            |                                                 |                                            
            |                                                 v
            |                                +-----------------------------+
            |                                | Status API                  |
            |                                | - Check status using        |
            |                                |   requestId                 |
            +<-------------------------------------------------------------+
            |                                                 |
            |                                                 |
            |                                                 v
+--------------------------+                  +--------------------------+
|     MongoDB Database     |                  |    Schema Design         |
+--------------------------+                  +--------------------------+
            |                                                 |
            |                                                 v
            |                                +-----------------------------+
            |                                | Product Collection          |
            |                                | - Save product data         |
            |                                | - Store input/output URLs   |
            +<-------------------------------------------------------------+
            |                                                 |
            |                                                 v
            |                                +-----------------------------+
            |                                | Request Collection          |
            |                                | - Store request details     |
            |                                | - Track processing status   |
            +<-------------------------------------------------------------+
            |                                                 |
            |                                                 v
            |                                +-----------------------------+
            |                                | Webhook Collection          |
            |                                | - Store webhook details     |
            +<-------------------------------------------------------------+
