// API Call
let apiUrl = "http://localhost:5000";
// Loop for each of the Issues Categories - in order from the Database
for (let i = 1; i <= 4; i++) {

// Create "Cols" for each of the Issues Status - Append array index to form "Column ID"
let column = document.getElementById("column" + i);

// Create the Drag function for each of the columns created above
  Sortable.create(column, {
    animation: 100,
    group: "list-1",
    draggable: ".list-group-item",
    handle: ".list-group-item",
    sort: true,
    filter: ".sortable-disabled",
    chosenClass: "active",
    // Listen for change in Card position within each Column
    onChange: function (event) {
      console.log(event.clone.id); // Check that I can access ID of the Event
      updateIssue(event.clone.id, i); // Call the Function to perform update. Refer to function below
    },
  });

  // Make a API call to get all Issues
  fetch(`${apiUrl}/issues/status/${i}`)
    .then((response) => response.json())
    .then((result) => {
      let data = result;
      let column = document.querySelector("#column" + i);
      column.innerHTML = "";
      
      data.forEach((card) => {
        let cardParent = document.createElement("div");
        let cardhHeader = document.createElement("div");
        let cardBody = document.createElement("div");
        let cardP1 = document.createElement("p");
        let cardP2 = document.createElement("p");
        let cardFooter = document.createElement("div");
        let cardFooterDiv = document.createElement("div");
        let cardFooterSpan = document.createElement("span");
        cardParent.className = "card border-secondary list-group-item rounded mb-3";
        cardhHeader.className ="card-header font-weight-bold text-black-50 pl-2";
        cardBody.className = "card-body font-weight-light text-secondary p-2";
        cardP1.className = "card-text";
        cardP2.className = "card-text small text-right";
        cardFooter.className = "card-footer p-2 text-muted small text-right";
        cardFooterSpan.className = "text-danger font-weight-bold";

        cardhHeader.innerHTML = card.issue_id;
        cardP1.innerHTML = card.title;
        cardP2.innerHTML = card.created_at;
        cardFooterDiv.innerHTML = "Priority: ";
        cardFooterSpan.innerHTML = card.priority_id;
        cardParent.setAttribute("id", card.id);

        column.appendChild(cardParent);
        cardParent.appendChild(cardhHeader);
        cardParent.appendChild(cardBody);
        cardBody.appendChild(cardP1);
        cardBody.appendChild(cardP2);
        cardParent.appendChild(cardFooter);
        cardFooter.appendChild(cardFooterDiv);
        cardFooterDiv.appendChild(cardFooterSpan);
      });
    });
}

// Update Issues Status when Card has been moved and dropped
const updateIssue = async (id, target) => {
  await fetch(`${apiUrl}/issues/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status_id: target }),
  })
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
    });
};
