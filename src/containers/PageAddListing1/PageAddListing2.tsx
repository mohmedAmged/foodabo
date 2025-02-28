import { MapPinIcon } from "@heroicons/react/24/solid";
import Label from "components/Label/Label";
import { FC } from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";
import { Map, Marker } from "@vis.gl/react-google-maps";

export interface PageAddListing2Props {}

const PageAddListing2: FC<PageAddListing2Props> = () => {
  return (
    <CommonLayout
      index="02"
      nextHref="/add-listing-3"
      backtHref="/add-listing-1"
    >
      <>
        <h2 className="text-2xl font-semibold">Your place location</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-8">
          <ButtonSecondary>
            <MapPinIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
            <span className="ml-3">Use current location</span>
          </ButtonSecondary>
          {/* ITEM */}
          <FormItem label="Country/Region">
            <Select>
              <option value="Viet Nam">Viet Nam</option>
              <option value="Thailand">Thailand</option>
              <option value="France">France</option>
              <option value="Singapore">Singapore</option>
              <option value="Jappan">Jappan</option>
              <option value="Korea">Korea</option>
              <option value="...">...</option>
            </Select>
          </FormItem>
          <FormItem label="Street">
            <Input placeholder="..." />
          </FormItem>
          <FormItem label="Room number (optional)">
            <Input />
          </FormItem>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
            <FormItem label="City">
              <Input />
            </FormItem>
            <FormItem label="State">
              <Input />
            </FormItem>
            <FormItem label="Postal code">
              <Input />
            </FormItem>
          </div>
          <div>
            <Label>Detailed address</Label>
            <span className="block mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              1110 Pennsylvania Avenue NW, Washington, DC 20230
            </span>
            <div className="mt-4">
              <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3">
                <div className="rounded-xl overflow-hidden">
                  <Map
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    defaultZoom={15}
                    defaultCenter={{
                      lat: 55.9607277,
                      lng: 36.2172614,
                    }}
                    gestureHandling={"greedy"}
                  >
                    <Marker
                      position={{ lat: 55.9607277, lng: 36.2172614 }}
                      draggable
                      onDragEnd={(e) => console.log(e)}
                    />
                  </Map>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing2;
