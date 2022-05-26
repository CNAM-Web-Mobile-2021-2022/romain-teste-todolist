import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonButton,
  IonList,
  IonSegment,
  IonLabel,
  IonCheckbox,
  IonIcon,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";
import React, { useState } from "react";
import { add } from "ionicons/icons";

import { useFonctionment } from "../todolistCode/fonctionment";
import { AffichageList } from "../todolistCode/listManipulation";

export const Tab2: React.FC = () => {
  const [text, setText] = useState("");
  const { list, addTodo, updateTodo, deleteTodo } = useFonctionment();
  const visibleTodoList = list.filter((item: any) => item.done);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>FAIRE</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonSegment
        onIonChange={() => {
          console.log("hello");
        }}
      ></IonSegment>
      <IonContent fullscreen>
        <form
          onSubmit={(event) => {
            addTodo(text);
            setText("");
            event.preventDefault();
          }}
        >
          <IonItem>
            <IonInput
              value={text}
              placeholder="chose à faire"
              onIonChange={(event) => setText(event.detail.value!)}
            ></IonInput>
            <IonButton color="primary" type="submit" disabled={!text}>
              Ajouter
            </IonButton>
          </IonItem>
        </form>

        <IonList>
          {visibleTodoList.map((affichageList: any) => {
            return (
              <AffichageList
                key={affichageList.id}
                text={affichageList.text}
                done={affichageList.done}
                onChange={(overrides: boolean) =>
                  updateTodo(affichageList.id, overrides)
                }
                onDelete={() => deleteTodo(affichageList.id)}
              />
            );
          })}
        </IonList>

        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 1 page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
