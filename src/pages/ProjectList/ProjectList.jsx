import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CaretDownIcon, CaretUpIcon,
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";

import React, { useState } from "react";
import ProjectCard from "../Project/ProjectCard";

export const tags = [
  "all",
  "react",
  "next.js",
  "spring boot",
  "mysql",
  "mongodb",
  "angular",
  "python",
  "flask",
  "django",
];

const ProjectList = () => {
  const [keyword, setKeyword] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const handleFilterChange = (section, value) => {
    console.log("value", value, section);
  };
  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };
  const handleOpenFilter = () => {
    console.log(openFilter)
    setOpenFilter(!openFilter);
  };

  return (
    <>
      <div className="container relative px-5 md:px-0 md:flex gap-5 justify-center p-5">
        {/* Filter Section Start Here */}

        <section className="filterSection ">
          <Card className="p-5 sticky top-10">
            <div className="flex justify-between md:w-[12rem] lg:w-[20rem]">
              <p className="text-xl -tracking-wider">Filter</p>
              {/* Desktop Filter Icon*/}
              <Button className={"hidden md:flex"} variant="ghost" size="icon">
                <MixerHorizontalIcon />
              </Button>
              {/*  Mobile Filter Icon*/}
              <Button className={"md:hidden"} variant="ghost" size="icon" onClick={handleOpenFilter} >
                {
                  openFilter ? <CaretUpIcon  /> : <CaretDownIcon  />
                }
              </Button>
            </div>
            {/* Category Section Start Here */}
            <CardContent className={`${openFilter ? "max-h-[500px]" : "max-h-0 p-0"} md:max-h-full overflow-hidden  transform transition-all duration-300 ease-in-out`}>
              <ScrollArea className="space-y-7 h-[70vh]">
                <div>
                  <h1 className="pb-3 text-gray-400 border-b">Category</h1>
                  <div className="pt-5">
                    <RadioGroup
                      className="space-y-3 pt-5"
                      defaultValue="all"
                      onValueChange={(value) =>
                        handleFilterChange("category", value)
                      }
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="all" id="r1" />
                        <Label htmlFor="r1">all</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="fullStake" id="r2" />
                        <Label htmlFor="r2">fullstake</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="fronend" id="r3" />
                        <Label htmlFor="r3">fronend</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="backend" id="r4" />
                        <Label htmlFor="r4">backend</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                {/* Category Section End Here */}

                {/* Tag Section Start Here */}

                <div className="pt-9">
                  <h1 className="pb-3 text-gray-400 border-b">Tag</h1>
                  <div className="pt-5">
                    <RadioGroup
                      className="space-y-3 pt-5"
                      defaultValue="all"
                      onValueChange={(value) =>
                        handleFilterChange("tag", value)
                      }
                    >
                      {tags.map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <RadioGroupItem value={item} id={`r1-${item}`} />
                          <Label htmlFor={`r1-${item}`}>{item}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>

            {/* Tags Section Start Here */}
          </Card>
        </section>

        {/* Filter Section End Here */}

        {/* ProjectList Section Start Here */}

        <section className="projectListSection w-full ">
          {/* Search Section Start Here */}
          <Card className="mt-5 md:mt-0 flex gap-2 items-center mb-5 justify-between">
            <div className="relative p-0 w-full">
              <Input
                onChange={handleSearchChange}
                placeholder="Search Project"
                className="40% px-9"
              />
              <MagnifyingGlassIcon className="absolute top-3 left-4" />
            </div>
          </Card>
          {/* Search Section End Here */}

          {/* project Show Section Start Here */}
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[74]">
              {keyword
                ? [1, 1, 1].map((item) => <ProjectCard key={item} />)
                : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item) => <ProjectCard key={item} />)}
            </div>
          </div>

          {/* project Show Section Ennd Here */}
        </section>

        {/* ProjectList Section End Here */}
      </div>
    </>
  );
};

export default ProjectList;
