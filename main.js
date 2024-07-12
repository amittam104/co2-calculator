import "./output.css";
import { Client, Databases, ID } from "appwrite";

export const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const database = new Databases(client);

// Decalre varibales for project input
const inputProjectName = document.getElementById("project-name");
const inputProductName = document.getElementById("product-name");
const inputPrimaryPackaging = document.getElementById("primary-pkg");
const inputPrimaryPackagingOptions =
  document.querySelector("#primary-pkg").selectedOptions;
const inputSecondaryPackaging = document.getElementById("secondary-pkg");
const inputSecondaryPackagingOptions =
  document.querySelector("#secondary-pkg").selectedOptions;
const inputTertiaryPackaging = document.getElementById("tertiary-pkg");
const inputTertiaryPackagingOptions =
  document.querySelector("#tertiary-pkg").selectedOptions;
const inputLogistics = document.getElementById("logistics");
const inputLogisticsOptions =
  document.querySelector("#logistics").selectedOptions;

const btnSubmitSetup = document.getElementById("btn-submit-setup");
const btnGoBackToSetup = document.getElementById("btn-backTo-setup");

const formSetup = document.getElementById("form-setup");
const formDetails = document.getElementById("form-details");
const cardEmission = document.getElementById("emission-card");

// Details Variables
// 1. Primary Pkg
const detailsPrimaryPouch = document.getElementById("details-primary-pouch");
const detailsPrimaryTray = document.getElementById("details-primary-tray");
const detailsPrimaryTrayLid = document.getElementById(
  "details-primary-tray_lids"
);
const detailsPrimaryPkgHoop = document.getElementById(
  "details-primary-packaging_hoop"
);
const detailsPrimaryDispenser = document.getElementById(
  "details-primary-dispenser"
);
const detailsPrimaryLooper = document.getElementById("details-primary-looper");
const detailsPrimaryAccClip = document.getElementById(
  "details-primary-acess_clip"
);
const detailsPrimaryBag = document.getElementById("details-primary-bag");
const detailsPrimaryJar = document.getElementById("details-primary-jar");

// 2. Secondary Pkg
const detailsSecondaryCarton = document.getElementById(
  "details-secondary-carton"
);
const detailsSecondaryFoamInserts = document.getElementById(
  "details-secondary-foam_inserts"
);

// 3. Tertiary Pkg
const detailsTertiaryCfb = document.getElementById("details-tertiary-cfb");
const detailsTertiaryPallets = document.getElementById(
  "details-tertiary-pallets"
);

// 4. Logistics
const detailsLogisticsRoad = document.getElementById("details-logistics-road");
const detailsLogisticsRoadMileage = document.getElementById(
  "details-logistics-road-mileage"
);
const detailsLogisticsAir = document.getElementById("details-logistics-air");
const detailsLogisticsShip = document.getElementById("details-logistics-ship");
const detailsLogisticsRail = document.getElementById("details-logistics-rail");

// Initial declaration of product setup data
let inputValueProjectName,
  inputValueProductName,
  inputValuePrimaryPkg,
  inputValueSecondaryPkg,
  inputValueTertiaryPkg,
  inputValueLogistics;

const primaryPkgArr = [];
const secondaryPkgArr = [];
const tertiaryPkgArr = [];
const logisticsPkgArr = [];

btnSubmitSetup.addEventListener("click", function (e) {
  e.preventDefault();

  inputValueProjectName = inputProjectName.value;
  inputValueProductName = inputProductName.value;
  inputValuePrimaryPkg = inputPrimaryPackaging.value;
  inputValueSecondaryPkg = inputSecondaryPackaging.value;
  inputValueTertiaryPkg = inputTertiaryPackaging.value;
  inputValueLogistics = inputLogistics.value;

  const setupInputs = [
    inputProjectName,
    inputProductName,
    inputPrimaryPackaging,
    inputSecondaryPackaging,
    inputTertiaryPackaging,
    inputLogistics,
  ];

  //   Setup input form validation
  setupInputs.forEach((input) => {
    const errorMessage = input.nextElementSibling.firstElementChild;
    let inputValue = input.value;
    if (!inputValue) errorMessage.classList.remove("hidden");
  });

  if (
    !inputValueProjectName ||
    !inputValueProductName ||
    !inputValuePrimaryPkg ||
    !inputValueSecondaryPkg ||
    !inputValueTertiaryPkg ||
    !inputValueLogistics
  )
    return;

  formSetup.classList.add("hidden");
  formDetails.classList.remove("hidden");

  Array.from(inputPrimaryPackagingOptions).forEach((pkg) => {
    if (pkg.selected) primaryPkgArr.push(pkg.value);
  });

  // Hide all the primary png inputs initially
  detailsPrimaryPouch.classList.add("hidden");
  detailsPrimaryTray.classList.add("hidden");
  detailsPrimaryTrayLid.classList.add("hidden");
  detailsPrimaryPkgHoop.classList.add("hidden");
  detailsPrimaryDispenser.classList.add("hidden");
  detailsPrimaryLooper.classList.add("hidden");
  detailsPrimaryAccClip.classList.add("hidden");
  detailsPrimaryBag.classList.add("hidden");
  detailsPrimaryJar.classList.add("hidden");

  //   Display Primary Packaging based on user selection
  if (primaryPkgArr.includes("Pouches")) {
    detailsPrimaryPouch.classList.remove("hidden");
  }

  if (primaryPkgArr.includes("Trays")) {
    detailsPrimaryTray.classList.remove("hidden");
  }

  if (primaryPkgArr.includes("Tray lids")) {
    detailsPrimaryTrayLid.classList.remove("hidden");
  }

  if (primaryPkgArr.includes("Packaging Hoops")) {
    detailsPrimaryPkgHoop.classList.remove("hidden");
  }

  if (primaryPkgArr.includes("Dispenser")) {
    detailsPrimaryDispenser.classList.remove("hidden");
  }

  if (primaryPkgArr.includes("Looper")) {
    detailsPrimaryLooper.classList.remove("hidden");
  }

  if (primaryPkgArr.includes("Accessory Clip")) {
    detailsPrimaryAccClip.classList.remove("hidden");
  }

  if (primaryPkgArr.includes("Bag")) {
    detailsPrimaryBag.classList.remove("hidden");
  }

  if (primaryPkgArr.includes("Jars")) {
    detailsPrimaryJar.classList.remove("hidden");
  }

  Array.from(inputSecondaryPackagingOptions).forEach((pkg) => {
    if (pkg.selected) secondaryPkgArr.push(pkg.value);
  });

  Array.from(inputTertiaryPackagingOptions).forEach((pkg) => {
    if (pkg.selected) tertiaryPkgArr.push(pkg.value);
  });

  // Hide all the secondary and tertiary pkg inputs initially
  detailsSecondaryFoamInserts.classList.add("hidden");
  detailsSecondaryCarton.classList.add("hidden");
  // detailsTertiaryPallets.classList.add("hidden");
  // detailsTertiaryCfb.classList.add("hidden");

  //   Display Secondary Packaging based on user selection
  if (secondaryPkgArr.includes("Cartons")) {
    detailsSecondaryCarton.classList.remove("hidden");
  }

  if (secondaryPkgArr.includes("Foam Inserts")) {
    detailsSecondaryFoamInserts.classList.remove("hidden");
  }

  //Update logistics slection by pushing it to array
  Array.from(inputLogisticsOptions).forEach((logs) => {
    if (logs.selected) logisticsPkgArr.push(logs.value);
  });

  // Hide all the logistics inputs initially
  detailsLogisticsRoad.classList.add("hidden");
  detailsLogisticsRoadMileage.classList.add("hidden");
  detailsLogisticsAir.classList.add("hidden");
  detailsLogisticsShip.classList.add("hidden");
  detailsLogisticsRail.classList.add("hidden");

  // Display logistics inputs based on user selection
  if (logisticsPkgArr.includes("road")) {
    detailsLogisticsRoad.classList.remove("hidden");
  }
  if (logisticsPkgArr.includes("roadMileage")) {
    detailsLogisticsRoadMileage.classList.remove("hidden");
  }
  if (logisticsPkgArr.includes("air")) {
    detailsLogisticsAir.classList.remove("hidden");
  }
  if (logisticsPkgArr.includes("ship")) {
    detailsLogisticsShip.classList.remove("hidden");
  }
  if (logisticsPkgArr.includes("rail")) {
    detailsLogisticsRail.classList.remove("hidden");
  }
});

// Go back to setup event listener on details
btnGoBackToSetup.addEventListener("click", function () {
  formSetup.classList.remove("hidden");
  formDetails.classList.add("hidden");
});

// ---------------------- Details Page -------------------------------

// Material Densities
const densityMaterial = {
  PET: 1.4,
  HDPE: 0.96,
  PVC: 1.23,
  LDPE: 0.92,
  PP: 0.89,
  PS: 1.03,
  RecycledPET: 1.4,
  RecycledHDPE: 0.96,
  RecycledPVC: 1.23,
  RecycledLDPE: 0.92,
  RecycledPP: 0.89,
  Recycledpaper: 0.7,
  Virginpaper: 1.2,
  MS: 1.85,
};

// Carbon emission values for materials
const carbonEmission = {
  PET: 2.15,
  HDPE: 1.6,
  PVC: 5.42,
  LDPE: 2.9,
  PP: 1.95,
  PS: 6.9,
  RecycledPET: 0.45,
  RecycledHDPE: 0.56,
  RecycledPVC: 0.04,
  RecycledLDPE: 0.86,
  RecycledPP: 0.5,
};

// Carbon emission values for fuels
const fuelCarbonEmission = {
  Petrol: 2.88,
  Ethanol: 1.24,
  PetrolE5: 2.8,
  PetrolE10: 2.72,
  Diesel: 3.24,
  BioDiesel: 1.92,
  DieselD5: 3.17,
  DieselD7: 3.15,
  CNG: 3.07,
  LPG: 1.9,
  JetKerosene: 3.1,
  HFO: 3.31,
  MDO: 3.53,
  MGO: 3.49,
};

// Type of Flute and it's Take-up factor
const FluteTakeUpFactor = {
  K: 1.7,
  A: 1.5,
  C: 1.43,
  B: 1.3,
  E: 1.25,
  F: 1.19,
  N: 1.15,
};

// Primary details variables
const pouch1stLayer = document.getElementById("pouch-first-layer");
const pouch2ndLayer = document.getElementById("pouch-second-layer");
const pouch1stThickness = document.getElementById("pouch-first-thickness");
const pouch2ndThickness = document.getElementById("pouch-second-thickness");
const pouchLength = document.getElementById("pouch-length");
const pouchWidth = document.getElementById("pouch-width");
const pouchQuantity = document.getElementById("pouch-quantity");

const btnDetailsSubmit = document.getElementById("btn-details-submit");

// Variables for final co2 emission values
let carbonEmissionSecondary, carbonEmissionTertiary, carbonEmissionTotal;

let carbonEmissionLogistics = 0;
let carbonEmissionPrimary = 0;

btnDetailsSubmit.addEventListener("click", function (e) {
  e.preventDefault();

  formSetup.classList.add("hidden");
  formDetails.classList.add("hidden");

  // Primary Packaging
  if (primaryPkgArr.includes("Pouches")) {
    const pouch1stLayerValue = pouch1stLayer.value;
    const pouch2ndLayerValue = pouch2ndLayer.value;

    const density1stLayer = densityMaterial[pouch1stLayerValue];
    const density2ndLayer = densityMaterial[pouch2ndLayerValue];

    const gsm1stLayer =
      (density1stLayer * pouch1stThickness.value * 1000 * 1000) / 1000000;
    const gsm2ndLayer =
      (density2ndLayer * pouch2ndThickness.value * 1000 * 1000) / 1000000;

    const areaOfLaminate = (pouchLength.value * pouchWidth.value) / 1000000;
    const weight1stLayer = gsm1stLayer * areaOfLaminate;
    const weight2ndLayer = gsm2ndLayer * areaOfLaminate;

    const carbonEmission1stLayer1Kg = carbonEmission[pouch1stLayerValue]; // Carbon emission for 1 Kg of 1st Layer of Laminate
    const carbonEmission1stLayer =
      (weight1stLayer * carbonEmission1stLayer1Kg) / 1000; // Carbon emission for 1st Layer in Laminate
    const carbonEmission2ndLayer1Kg = carbonEmission[pouch2ndLayerValue]; // Carbon emission for 1 Kg of 2nd Layer of Laminate
    const carbonEmission2ndLayer =
      (weight2ndLayer * carbonEmission2ndLayer1Kg) / 1000; // Carbon emission for 2nd Layer in Laminate

    const carbonEmissionInk = 2.2;

    const carbonEmission1Primary =
      carbonEmission1stLayer + carbonEmission2ndLayer;

    const carbonEmissionPrimaryPouch = Number(
      (carbonEmission1Primary * pouchQuantity.value).toFixed(1)
    );

    carbonEmissionPrimary += carbonEmissionPrimaryPouch;
  }

  if (primaryPkgArr.includes("Trays")) {
    const trayMaterial = document.getElementById("tray-material");
    const trayLength = document.getElementById("tray-length");
    const trayWidth = document.getElementById("tray-width");
    const trayHeight = document.getElementById("tray-height");
    const trayThickness = document.getElementById("tray-thickness");
    const trayQuantity = document.getElementById("tray-quantity");

    const trayMetrialValue = trayMaterial.value;

    const densityTrayMaterial = densityMaterial[trayMetrialValue];

    const areaTray =
      ((trayLength.value * 2 + trayWidth.value * 2) *
        (trayWidth.value * 2 + trayHeight.value * 2)) /
      1000000;

    const volumeTray = (areaTray * trayThickness.value) / 1000;

    const weight1Tray = volumeTray * densityTrayMaterial * 1000;

    const weightNTrays = weight1Tray * trayQuantity.value;

    const carbonEmissionTrayMaterial = carbonEmission[trayMetrialValue];

    const carbonEmission1Tray =
      (carbonEmissionTrayMaterial * weight1Tray) / 1000;

    const carbonEmissionPrimaryTray = Number(
      (carbonEmission1Tray * trayQuantity.value).toFixed(3)
    );

    carbonEmissionPrimary += carbonEmissionPrimaryTray;
  }

  if (primaryPkgArr.includes("Tray lids")) {
    const trayLidMaterial = document.querySelector("#traylid-material");
    const trayLidLength = document.querySelector("#traylid-length");
    const trayLidWidth = document.querySelector("#traylid-width");
    const trayLidDepthHeight = document.querySelector("#traylid-depth-height");
    const trayLidThickness = document.querySelector("#traylid-thickness");
    const trayLidQuantity = document.querySelector("#traylid-quantity");

    const trayLidMetrialValue = trayLidMaterial.value;

    const densityTrayLidMaterial = densityMaterial[trayLidMetrialValue];

    const areaTrayLid =
      ((2 * trayLidLength.value + 2 * trayLidWidth.value) *
        (2 * trayLidWidth.value + 2 * trayLidDepthHeight.value)) /
      1000000;

    const volumeTrayLid = (areaTrayLid * trayLidThickness.value) / 1000000;

    const weight1TrayLid = densityTrayLidMaterial * volumeTrayLid * 1000 * 1000;

    const weightNTrayLid = weight1TrayLid * trayLidQuantity.value;

    const carbonEmission1KgTrayLid = carbonEmission[trayLidMetrialValue];

    const carbonEmission1TrayLid =
      (carbonEmission1KgTrayLid * weight1TrayLid) / 1000;

    const carbonEmissionPrimaryTrayLid =
      carbonEmission1TrayLid * trayLidQuantity.value;

    carbonEmissionPrimary += carbonEmissionPrimaryTrayLid;
  }

  if (primaryPkgArr.includes("Packaging Hoops")) {
    const PkgHoopMaterial = document.querySelector("#pkgHoop-material");
    const PkgHoopWeight = document.querySelector("#pkgHoop-weight");
    const PkgHoopQuantity = document.querySelector("#pkgHoop-quantity");

    const pkgHoopMetrialValue = PkgHoopMaterial.value;

    const densityPkgHoopMaterial = densityMaterial[pkgHoopMetrialValue];

    const weightofnHoops = PkgHoopWeight.value * PkgHoopQuantity.value;

    console.log(weightofnHoops);
    const carbonEmission1KgPkgHoop = carbonEmission[pkgHoopMetrialValue];

    console.log(carbonEmission1KgPkgHoop);
    const carbonEmission1PrimaryPkgHoop =
      (carbonEmission1KgPkgHoop * PkgHoopWeight.value) / 1000;

    console.log(carbonEmission1PrimaryPkgHoop);
    const carbonEmissionPrimaryPkgHoop =
      carbonEmission1PrimaryPkgHoop * PkgHoopQuantity.value;

    carbonEmissionPrimary += carbonEmissionPrimaryPkgHoop;
  }

  if (primaryPkgArr.includes("Dispenser")) {
    const dispenserMaterial = document.querySelector("#dispenser-material");
    const dispenserWeight = document.querySelector("#dispenser-weight");
    const dispenserQuantity = document.querySelector("#dispenser-quantity");

    const dispenserMetrialValue = dispenserMaterial.value;

    const densityDispenserMaterial = densityMaterial[dispenserMetrialValue];

    const weightofnHoops = dispenserWeight.value * dispenserQuantity.value;

    console.log(weightofnHoops);
    const carbonEmission1KgDispenser = carbonEmission[dispenserMetrialValue];

    console.log(carbonEmission1KgDispenser);
    const carbonEmission1Primarydispenser =
      (carbonEmission1KgDispenser * dispenserWeight.value) / 1000;

    console.log(carbonEmission1Primarydispenser);
    const carbonEmissionPrimaryDispenser =
      carbonEmission1Primarydispenser * dispenserQuantity.value;

    carbonEmissionPrimary += carbonEmissionPrimaryDispenser;
  }

  if (primaryPkgArr.includes("Looper")) {
    const looperMaterial = document.querySelector("#looper-material");
    const looperWeight = document.querySelector("#looper-weight");
    const looperQuantity = document.querySelector("#looper-quantity");

    const looperMetrialValue = looperMaterial.value;

    const densityLooperMaterial = densityMaterial[looperMetrialValue];

    const weightofnLooper = looperWeight.value * looperQuantity.value;

    const carbonEmission1KgLooper = carbonEmission[looperMetrialValue];

    const carbonEmission1PrimaryLooper =
      (carbonEmission1KgLooper * looperWeight.value) / 1000;

    const carbonEmissionPrimaryLooper =
      carbonEmission1PrimaryLooper * looperQuantity.value;

    carbonEmissionPrimary += carbonEmissionPrimaryLooper;
  }

  if (primaryPkgArr.includes("Accessory Clip")) {
    const accClipMaterial = document.querySelector("#accClip-material");
    const accClipWeight = document.querySelector("#accClip-weight");
    const accClipQuantity = document.querySelector("#accClip-quantity");

    const accClipMetrialValue = accClipMaterial.value;

    const densityAccClipMaterial = densityMaterial[accClipMetrialValue];

    const weightofnAccClip = accClipWeight.value * accClipQuantity.value;

    const carbonEmission1KgAccClip = carbonEmission[accClipMetrialValue];

    const carbonEmission1PrimaryAccClip =
      (carbonEmission1KgAccClip * accClipWeight.value) / 1000;

    const carbonEmissionPrimaryAccClip =
      carbonEmission1PrimaryAccClip * accClipQuantity.value;

    carbonEmissionPrimary += carbonEmissionPrimaryAccClip;
  }

  if (primaryPkgArr.includes("Bag")) {
    const bagMaterial = document.querySelector("#bag-material");
    const bagWeight = document.querySelector("#bag-weight");
    const bagQuantity = document.querySelector("#bag-quantity");

    const bagMetrialValue = bagMaterial.value;

    const densityBagMaterial = densityMaterial[bagMetrialValue];

    const weightofnHoops = bagWeight.value * bagQuantity.value;

    console.log(weightofnHoops);
    const carbonEmission1KgBag = carbonEmission[bagMetrialValue];

    console.log(carbonEmission1KgBag);
    const carbonEmission1PrimaryBag =
      (carbonEmission1KgBag * bagWeight.value) / 1000;

    console.log(carbonEmission1PrimaryBag);
    const carbonEmissionPrimaryBag =
      carbonEmission1PrimaryBag * bagQuantity.value;

    carbonEmissionPrimary += carbonEmissionPrimaryBag;
  }

  if (primaryPkgArr.includes("Jars")) {
    const jarMaterial = document.querySelector("#jar-material");
    const jarWeight = document.querySelector("#jar-weight");
    const jarQuantity = document.querySelector("#jar-quantity");

    const jarMetrialValue = jarMaterial.value;

    const densityJarMaterial = densityMaterial[jarMetrialValue];

    const weightofnHoops = jarWeight.value * jarQuantity.value;

    console.log(weightofnHoops);
    const carbonEmission1KgJar = carbonEmission[jarMetrialValue];

    console.log(carbonEmission1KgJar);
    const carbonEmission1PrimaryJar =
      (carbonEmission1KgJar * jarWeight.value) / 1000;

    console.log(carbonEmission1PrimaryJar);
    const carbonEmissionPrimaryJar =
      carbonEmission1PrimaryJar * jarQuantity.value;

    carbonEmissionPrimary += carbonEmissionPrimaryJar;
  }

  // Secondary Packaging
  if (inputValueSecondaryPkg === "Cartons") {
    // Secondary Packaging
    const cartonLength = document.getElementById("carton-length");
    const cartonWidth = document.getElementById("carton-width");
    const cartonHeight = document.getElementById("carton-height");
    const cartonThickness = document.getElementById("carton-thickness");
    const cartonGSM = document.getElementById("carton-GSM");
    const cartonQuantity = document.getElementById("carton-quantity");

    const reelSize = Number(cartonHeight.value) + Number(cartonWidth.value);

    const sheetSize = 2 * cartonWidth.value + 2 * cartonLength.value;

    const areaCarton = (reelSize * sheetSize) / 1000000;

    const weightCarton = (areaCarton * cartonGSM.value) / 1000;

    const carbonEmission1KgCarton = 1.2;

    const carbonEmission1Carton = carbonEmission1KgCarton * weightCarton;

    carbonEmissionSecondary = carbonEmission1Carton * cartonQuantity.value;
  }

  if (inputValueSecondaryPkg === "Foam Inserts") {
  }

  // Tertiary Packaging
  // CFB = Shipper
  if (inputValueTertiaryPkg === "CFB") {
    const cfbLength = document.getElementById("cfb-length");
    const cfbWidth = document.getElementById("cfb-width");
    const cfbHeight = document.getElementById("cfb-height");
    const cfbTypeOuterFlute = document.getElementById("cfb-type-outer-flute");
    const cfbTypeInnerFlute = document.getElementById("cfb-type-inner-flute");
    const cfbQuantity = document.getElementById("cfb-quantity");
    const cfbOuterLayer = document.getElementById("cfb-outer-layer");
    const cfbOuterFlute = document.getElementById("cfb-outer-flute");
    const cfbMiddleLayer = document.getElementById("cfb-middle-layer");
    const cfbInnerFlute = document.getElementById("cfb-inner-flute");
    const cfbInnerLayer = document.getElementById("cfb-inner-layer");
    const cfbPinWeight = document.getElementById("cfb-pin-weight");

    const takeUpFactorOuterFlute = FluteTakeUpFactor[cfbTypeOuterFlute.value];
    const takeUpFactorInnerFlute = FluteTakeUpFactor[cfbTypeInnerFlute.value];

    const reelSize =
      (Number(cfbWidth.value) + Number(cfbHeight.value) + 10) / 1000;

    const sheetSize =
      (Number(cfbLength.value * 2) + Number(cfbWidth.value) * 2 + 35) / 1000;

    const area = reelSize * sheetSize;

    const weightOuterLayer = (Number(cfbOuterLayer.value) * area) / 1000;
    const weightOuterFlute =
      (takeUpFactorOuterFlute * (Number(cfbOuterFlute.value) * area)) / 1000;
    const weightMiddleLayer = (Number(cfbMiddleLayer.value) * area) / 1000;

    const weightInnerFlute =
      (takeUpFactorInnerFlute * (Number(cfbInnerFlute.value) * area)) / 1000;

    const weightInnerLayer = (Number(cfbInnerLayer.value) * area) / 1000;

    const grossWeight =
      weightOuterLayer +
      weightOuterFlute +
      weightMiddleLayer +
      weightInnerFlute +
      weightInnerLayer;

    const NoOfPins = (Number(cfbHeight.value) * 2) / 50.8;

    const grossWeightPins = (NoOfPins * Number(cfbPinWeight.value)) / 1000;

    const carbonEmissionCFBPaper = grossWeight * 0.7;
    const carbonEmissionCFBPins = grossWeightPins * 1.85;

    const carbonEmission1CFB = carbonEmissionCFBPaper + carbonEmissionCFBPins;

    const carbonEmissionTertiaryFull =
      carbonEmission1CFB * Number(cfbQuantity.value);

    carbonEmissionTertiary = Number(carbonEmissionTertiaryFull.toFixed(1));
  }

  // Logistics
  if (logisticsPkgArr.includes("road")) {
    const roadFuelType = document.getElementById(
      "logistics-fuel-type-road"
    ).value;

    const roadFuelCarbonEmission = fuelCarbonEmission[roadFuelType];

    const roadFuelQuantity =
      document.getElementById("road-fuel-quantity").value;

    const carbonEmissionRoad = roadFuelCarbonEmission * roadFuelQuantity;

    carbonEmissionLogistics += carbonEmissionRoad;
  }

  if (logisticsPkgArr.includes("roadMileage")) {
    const roadMileageFuelType = document.getElementById(
      "logistics-fuel-type-road-milage"
    ).value;

    const roadMileageFuelCarbonEmission =
      fuelCarbonEmission[roadMileageFuelType];

    const roadVehicleMileage = document.getElementById(
      "road-mileage-fuel-vehicle"
    ).value;
    const roadMileageDistance = document.getElementById(
      "road-mileage-distance"
    ).value;

    const roadMileageFuelQuantity = roadMileageDistance / roadVehicleMileage;

    const carbonEmissionRoadMileage =
      roadMileageFuelCarbonEmission * roadMileageFuelQuantity;

    carbonEmissionLogistics += carbonEmissionRoadMileage;
  }

  if (logisticsPkgArr.includes("air")) {
    const airFuelType = document.getElementById(
      "logistics-fuel-type-air"
    ).value;

    const airFuelCarbonEmission = fuelCarbonEmission[airFuelType];

    const airFuelQuantity = document.getElementById("air-fuel-quantity").value;

    const carbonEmissionAir = airFuelCarbonEmission * airFuelQuantity;

    carbonEmissionLogistics += carbonEmissionAir;
  }

  if (logisticsPkgArr.includes("ship")) {
    const shipFuelType = document.getElementById(
      "logistics-fuel-type-ship"
    ).value;

    const shipFuelCarbonEmission = fuelCarbonEmission[shipFuelType];

    const shipFuelQuantity =
      document.getElementById("ship-fuel-quantity").value;

    const carbonEmissionShip = shipFuelCarbonEmission * shipFuelQuantity;
    carbonEmissionLogistics += carbonEmissionShip;
  }

  if (logisticsPkgArr.includes("rail")) {
    const railDistance = document.getElementById("rail-distance").value;

    const carbonEmission1000Km = 6;

    const carbonEmissionRail = (railDistance * carbonEmission1000Km) / 1000;
    carbonEmissionLogistics += carbonEmissionRail;
  }

  // Display Carbon emissions of all pkg and total emission
  const projectNameFinal = document.getElementById("project-name-final");
  const productFinalName = document.getElementById("product-name-final");
  const primaryEmission = document.getElementById("primary-emission");
  const secondaryEmission = document.getElementById("secondary-emission");
  const tertiaryEmission = document.getElementById("tertiary-emission");
  const logisticsEmission = document.getElementById("logistics-emission");
  const totalEmission = document.getElementById("total-emission");

  projectNameFinal.textContent = inputProjectName.value;
  productFinalName.textContent = inputProductName.value;

  primaryEmission.innerHTML = "";
  secondaryEmission.innerHTML = "";
  tertiaryEmission.innerHTML = "";
  logisticsEmission.innerHTML = "";
  totalEmission.innerHTML = "";

  const primaryMarkup = `
  <p>Primary Pack Carbon Emission</p>
  <p class="text-lg font-semibold">
    ${carbonEmissionPrimary.toFixed(
      1
    )} <span class="text-sm font-normal">kg of CO<sub>2</sub>e</span>
  </p>
  `;

  const secondaryMarkup = `
  <p>Secondary Pack Carbon Emission</p>
  <p class="text-lg font-semibold">
  ${carbonEmissionSecondary.toFixed(
    1
  )} <span class="text-sm font-normal">kg of CO<sub>2</sub>e</span>
  </p>
  `;

  const tertiaryMarkup = `
    <p>Tertiary Pack Carbon Emission</p>
    <p class="text-lg font-semibold">
    ${carbonEmissionTertiary.toFixed(
      1
    )} <span class="text-sm font-normal">kg of CO<sub>2</sub>e</span>
    </p>
  `;

  const logisticsMarkup = `
  <p>Logistics Carbon Emission</p>
    <p class="text-lg font-semibold">
       ${carbonEmissionLogistics.toFixed(1)}
      <span class="text-sm font-normal">kg of CO<sub>2</sub>e</span>
    </p>
  `;

  carbonEmissionTotal = Number(
    (
      carbonEmissionPrimary +
      carbonEmissionSecondary +
      carbonEmissionTertiary +
      carbonEmissionLogistics
    ).toFixed(1)
  );

  const TotalMarkup = `
    <p>Total Carbon Emission</p>
    <p class="text-lg font-semibold">
      ${carbonEmissionTotal} <span class="text-sm font-normal">kg of CO<sub>2</sub>e</span>
    </p>
  `;

  primaryEmission.insertAdjacentHTML("afterbegin", primaryMarkup);
  secondaryEmission.insertAdjacentHTML("afterbegin", secondaryMarkup);
  tertiaryEmission.insertAdjacentHTML("afterbegin", tertiaryMarkup);
  logisticsEmission.insertAdjacentHTML("afterbegin", logisticsMarkup);
  totalEmission.insertAdjacentHTML("afterbegin", TotalMarkup);

  cardEmission.classList.remove("hidden");
});

// Add Project details to Appwrite database
const saveEmissionData = async function () {
  try {
    const response = await database.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COLLECTION_ID,
      ID.unique(),
      {
        project: `${inputProjectName.value}`,
        product: `${inputProductName.value}`,
        primary: carbonEmissionPrimary,
        secondary: carbonEmissionSecondary,
        tertiary: carbonEmissionTertiary,
        logistics: carbonEmissionLogistics,
        total: carbonEmissionTotal,
      }
    );

    console.log(response);

    if (!response.$id)
      throw new Error("Something went wrong! Please try again.");

    if (response.$id) {
      document.getElementById(
        "modal-text"
      ).textContent = `Thank you for your submission. Please view the dashboard for more details.`;
    }
  } catch (error) {
    document.getElementById(
      "modal-text"
    ).textContent = `Something went wrong! Please try again.`;
  }
};

const submitToDataBase = document.getElementById("submit-emission");

submitToDataBase.addEventListener("click", function (e) {
  e.preventDefault();
  saveEmissionData();
});

// window.location.href = "dashboard.html";
