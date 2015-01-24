Format of data.gov.bn.json: Array of datasets
[{dataset1},{dataset2},...]

==============
dataset format
==============

    {
        "category": "Category",
        "datasets": [
            {
                "link": "full link to dataset attachment",
                "link_broken": "broken link from the listing page",
                "title": "name of attachment in attachments folder",
                "title_duplicate": "Duplicate title"
            }
        ],
        "details": "Details page of the dataset (will contain proper link if link is broken on the main listing page)",
        "publisher": "Ministry of Industry and Primary Resources",
        "title": "IMPORT OF AGRICULTURE PRODUCT BY TYPES (2013)",
        "updated": "Wednesday, December 3, 2014"
    },


Example:
    {
        "category": "Agriculture, Forestry and Fishery",
        "datasets": [
            {
                "link": "http://www.data.gov.bn/Lists/dataset/Attachments/71/IMPORT%20BY%20COUNTRY%20(2013).xlsx",
                "title": "IMPORT BY COUNTRY (2013) (1).xlsx",
                "title_duplicate": "IMPORT BY COUNTRY (2013).xlsx"
            }
        ],
        "details": "http://www.data.gov.bn/Lists/dataset/mdisplay.aspx?ID=71",
        "publisher": "Ministry of Industry and Primary Resources",
        "title": "IMPORT BY COUNTRY (2013)",
        "updated": "Wednesday, December 3, 2014"
    },
