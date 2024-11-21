import { mainData } from "./mainData";
import { addresses } from "./addressesData";
import { shuffle } from "lodash";
import { stepsData } from "./stepsData";
///////////////////////////////////////////////

const GLOB_PATHS = {
  files: import.meta.glob("../*.js"),
  icons: import.meta.glob("../../assets/stepperIcons/*.svg"),
  locationIcons: import.meta.glob("../../assets/locations/*.svg"),
};

const extractNumber = (path) => parseInt(path.match(/\d+/)?.[0] || "0");

const generateFileName = (prefix, number, ext) => `${prefix}_${number}${ext}`;

const sortByNumber = ([pathA], [pathB]) =>
  extractNumber(pathA) - extractNumber(pathB);

const processModule = async ([path, importFn], filePrefix, ext) => {
  const fileNumber = extractNumber(path);
  const fileName = generateFileName(filePrefix, fileNumber, ext);
  const { data } = await importFn();

  return data ? { [fileName]: data } : { fileName };
};

const loadDataModules = async (fileModules, filePrefix, ext = "") => {
  try {
    const sortedFiles = Object.entries(fileModules).sort(sortByNumber);

    return await Promise.all(
      sortedFiles.map((entry) => processModule(entry, filePrefix, ext))
    );
  } catch (error) {
    console.error("Error importing modules:", error);
    return [];
  }
};

export const items =
  (page) =>
  async (
    { lang },
    iconPrefix = "/src/assets/stepperIcons/",
    locationPrefix = "/src/assets/locations/"
  ) => {
    const dataModules = await loadDataModules(GLOB_PATHS.files, "file");
    const iconModule = await loadDataModules(GLOB_PATHS.icons, "icon", ".svg");
    const locationIconsModule = await loadDataModules(
      GLOB_PATHS.locationIcons,
      "locationIcon",
      ".svg"
    );
    const manasekData = stepsData[1].map((el) => {
      return {
        index: el.id + 1,
        title: el.name[lang],
        prayerData: shuffle(dataModules[el.id - 1][`file_${el.id}`]),
        useCount: el.have_counter,
        cardCounterTitle: el.have_counter ? mainData[lang]["circuits"] : "",
        cardPrayerTitle: "test",
        counterName: el.have_counter ? `${el.id}_${lang}` : "",
        audio: el.id === 1 || el.id === 3 ? `assets/${el.id}` : "",
        autoPlay: el.id === 1 || el.id === 3 ? mainData[lang]["autoPlay"] : "",
        icon: `${iconPrefix}${iconModule[el.id - 1]["fileName"]}`,
        modalTitle: mainData[lang]["location"],
        closeTitle: mainData[lang]["closeTitle"],
        modalBody: locationPrefix + locationIconsModule[0]["fileName"],
        addresses: addresses[el.id],
        type: el.id === 1 ? 1 : 2,
        disableNext: stepsData[1].length === el.id,
        showFinalMessage: el.id === 3
      };
    });

    const instructionsPage = stepsData[2].map(el=> {
      return {
        index: el.id  - stepsData[1].length + 1,
        title: el.name[lang],
        prayerData: dataModules[el.id - 1][`file_${el.id}`],
        icon: iconPrefix + iconModule[el.id - 1]["fileName"],
        disableNext: stepsData[2].length === (el.id - stepsData[1].length) 
      }
    })
    const data = {
      manasekPage: manasekData,
      instructionsPage:instructionsPage 
    };
    return data[page];
  };
