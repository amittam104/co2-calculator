import "./output.css";
import { Client, Databases } from "appwrite";
import Chart from "chart.js/auto";

export const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const database = new Databases(client);

const tableRecord = document.getElementById("emission-table");
const btnCompareEmission = document.getElementById("compare-emission");
btnCompareEmission.disabled = "disabled";

(async function () {
  try {
    const response = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COLLECTION_ID
    );

    response.documents.forEach(async (data) => {
      await database.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        data.$id,
        { checked: false }
      );
      // await Promise.all(updatePromises);
    });
  } catch (error) {
    console.error(error);
  }
})();

// Get Emission data
const getEmissionData = async function () {
  try {
    const response = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COLLECTION_ID
    );

    console.log(response);

    const emissionList = response.documents;

    // let primaryData;
    // Add data to plot graph - Add button event listner
    emissionList.forEach(async (data) => {
      renderEmissionList(data);

      const chartRow = document.getElementById(`add-${data.$id}`);
      const removeRow = document.getElementById(`remove-${data.$id}`);

      // document.getElementById("trees-plant").classList.remove("hidden");

      let NumberofTrees = 0;

      chartRow.addEventListener("click", async function () {
        data.checked = true;

        await database.updateDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_ID,
          data.$id,
          { checked: data.checked }
        );

        chartRow.closest("tr").classList.add("bg-base-200");
        btnCompareEmission.disabled = "";

        // Update Primary card value
        let primaryDataValue =
          Number(document.querySelector("#primary-data-card").textContent) || 0;
        primaryDataValue += data.primary;

        document.querySelector(
          "#primary-data-card"
        ).innerHTML = `${primaryDataValue.toFixed(1)}`;

        // Update Secondary card value
        let secondaryDataValue =
          Number(document.querySelector("#secondary-data-card").textContent) ||
          0;
        secondaryDataValue += data.secondary;

        document.querySelector(
          "#secondary-data-card"
        ).innerHTML = `${secondaryDataValue.toFixed(1)}`;

        // Update Tertiary card value
        let tertiaryDataValue =
          Number(document.querySelector("#tertiary-data-card").textContent) ||
          0;
        tertiaryDataValue += data.tertiary;

        document.querySelector(
          "#tertiary-data-card"
        ).innerHTML = `${tertiaryDataValue.toFixed(1)}`;

        // Update Logistics card value
        let logisticsDataValue =
          Number(document.querySelector("#logistics-data-card").textContent) ||
          0;
        logisticsDataValue += data.logistics;

        document.querySelector(
          "#logistics-data-card"
        ).innerHTML = `${logisticsDataValue.toFixed(1)}`;

        // Update Total card value
        let totalDataValue =
          Number(document.querySelector("#total-data-card").textContent) || 0;
        totalDataValue += data.total;

        document.querySelector(
          "#total-data-card"
        ).innerHTML = `${totalDataValue.toFixed(1)}`;

        console.log(totalDataValue);

        NumberofTrees = Math.ceil((totalDataValue / 1000) * 6);
        document.getElementById("trees").textContent = NumberofTrees;
      });

      removeRow.addEventListener("click", async function () {
        data.checked = false;

        await database.updateDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_ID,
          data.$id,
          { checked: data.checked }
        );

        chartRow.closest("tr").classList.remove("bg-base-200");

        // Remove Primary card value
        let primaryDataValue =
          Number(document.querySelector("#primary-data-card").textContent) || 0;

        primaryDataValue -= data.primary;
        primaryDataValue = Math.max(0, primaryDataValue);

        document.querySelector(
          "#primary-data-card"
        ).innerHTML = `${primaryDataValue.toFixed(1)}`;

        // Remove Secondary card value
        let secondaryDataValue =
          Number(document.querySelector("#secondary-data-card").textContent) ||
          0;

        secondaryDataValue -= data.secondary;
        secondaryDataValue = Math.max(0, secondaryDataValue);

        document.querySelector(
          "#secondary-data-card"
        ).innerHTML = `${secondaryDataValue.toFixed(1)}`;

        // Remove Tertiary card value
        let tertiaryDataValue =
          Number(document.querySelector("#tertiary-data-card").textContent) ||
          0;

        tertiaryDataValue -= data.tertiary;
        tertiaryDataValue = Math.max(0, tertiaryDataValue);

        document.querySelector(
          "#tertiary-data-card"
        ).innerHTML = `${tertiaryDataValue.toFixed(1)}`;

        // Remove Logistics card value
        let logisticsDataValue =
          Number(document.querySelector("#logistics-data-card").textContent) ||
          0;

        logisticsDataValue -= data.logistics;
        logisticsDataValue = Math.max(0, logisticsDataValue);

        document.querySelector(
          "#logistics-data-card"
        ).innerHTML = `${logisticsDataValue.toFixed(1)}`;

        // Remove Total card value
        let totalDataValue =
          Number(document.querySelector("#total-data-card").textContent) || 0;

        totalDataValue -= data.total;
        totalDataValue = Math.max(0, totalDataValue);

        document.querySelector(
          "#total-data-card"
        ).innerHTML = `${totalDataValue.toFixed(1)}`;

        NumberofTrees = Math.ceil((totalDataValue / 1000) * 6);
        document.getElementById("trees").textContent = NumberofTrees;
      });
    });
    // await Promise.all(response);
  } catch (error) {
    console.log(error);
  }
};

getEmissionData();

const renderEmissionList = function (data) {
  const emissionData = {
    project: data.project,
    product: data.product,
    primary: data.primary.toFixed(1),
    secondary: data.secondary.toFixed(1),
    tertiary: data.tertiary.toFixed(1),
    logistics: data.logistics.toFixed(1),
    total: data.total.toFixed(1),
  };

  const tableRow = `
        <tr id='emission-${data.$id}'>
            <td>${emissionData.project}</td>
            <td>${emissionData.product}</td>
            <td>${emissionData.primary} Kg</td>
            <td>${emissionData.secondary} Kg</td>
            <td>${emissionData.tertiary} Kg</td>
            <td>${emissionData.logistics} Kg</td>
            <td>${emissionData.total} Kg</td>
            <th class="flex flex-col items-center justify-center gap-2">
              <button class="btn btn-primary btn-xs" id="add-${data.$id}">Add</button>
              <button class="btn btn-ghost btn-xs" id="remove-${data.$id}">Remove</button>
            </th>
        </tr>
    `;

  tableRecord.insertAdjacentHTML("afterbegin", tableRow);
};

let barChart;
let totalBarChart;

const ctx = document.getElementById("myChart");
const ctxTotal = document.getElementById("myChart-total");

const compareEmission = async function () {
  try {
    const response = await database.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COLLECTION_ID
    );

    console.log(response);

    const emissionList = response.documents;

    const chartData = {
      labels: ["Primary Pack", "Secondary Pack", "Tertiary Pack", "Logistics"],
      datasets: [],
    };

    const chartDataTotal = {
      labels: ["Total"],
      datasets: [],
    };

    emissionList.forEach((data) => {
      if (data.checked === true) {
        chartData.datasets.push({
          label: data.project,
          data: [data.primary, data.secondary, data.tertiary, data.logistics],
          borderWidth: 1,
          maxBarThickness: 75,
        });
      }
    });

    emissionList.forEach((data) => {
      if (data.checked === true) {
        chartDataTotal.datasets.push({
          label: data.project,
          data: [data.total],
          borderWidth: 1,
          maxBarThickness: 75,
        });
      }
    });

    // if (chartData.datasets.length > 1) return;
    placeHolderChart.destroy();
    placeHolderTotalChart.destroy();

    if (barChart) {
      barChart.data.datasets = chartData.datasets;
      barChart.update();
    } else {
      barChart = new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: {
          // indexAxis: "y",
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            title: {
              display: true,
              text: "CO₂e Emissions in Kg",
            },
          },
        },
      });
    }

    if (totalBarChart) {
      totalBarChart.data.datasets = chartDataTotal.datasets;
      totalBarChart.update();
    } else {
      totalBarChart = new Chart(ctxTotal, {
        type: "bar",
        data: chartDataTotal,
        options: {
          // indexAxis: "y",
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            title: {
              display: true,
              text: `CO₂e Emissions in Kg`,
            },
          },
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
};
btnCompareEmission.addEventListener("click", compareEmission);

// Charts at the initial load
const placeHolderChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Primary Pack", "Secondary Pack", "Tertiary Pack", "Logistics"],
    datasets: [
      {
        label: "Project Name",
        data: 0,
        borderWidth: 1,
      },
    ],
  },
  options: {
    // indexAxis: "y",
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "CO₂e Emissions in Kg",
      },
    },
  },
});

const placeHolderTotalChart = new Chart(ctxTotal, {
  type: "bar",
  data: {
    labels: ["Total"],
    datasets: [
      {
        label: "Project Name",
        data: 0,
        borderWidth: 1,
      },
    ],
  },
  options: {
    // indexAxis: "y",
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "CO₂e Emissions in Kg",
      },
    },
  },
});
