import {
  IonButton,
  IonLabel,
  IonItem,
  IonCheckbox,
  IonIcon,
  IonAlert,
} from "@ionic/react";
import React, { useState } from "react";
import { trashBinOutline } from "ionicons/icons";
export function AffichageList(props) {
  const { text, done, onChange, onDelete } = props;

  return (
    <IonItem className={`todo-item ${done ? "-checked" : ""}`}>
      <IonCheckbox
        slot="start"
        checked={done}
        onIonChange={() => onChange({ done: !done })}
      />
      {/* window.location.reload()  */}
      <IonLabel onClick={() => onChange({ done: !done })}>{text}</IonLabel>
      <DeleteButton onDelete={onDelete} />
    </IonItem>
  );
}

function DeleteButton(props) {
  const { onDelete } = props;
  const [isConfirming, setConfirming] = useState(false);

  return (
    <>
      <IonButton
        fill="clear"
        onClick={() => setConfirming(true)}
        color="danger"
      >
        <IonIcon slot="icon-only" icon={trashBinOutline} />
      </IonButton>

      <IonAlert
        isOpen={isConfirming}
        onWillDismiss={() => setConfirming(false)}
        header={"Alert"}
        sudHeader={"Suppression"}
        message={"La tâche sera supprimée définitivement"}
        buttons={[
          "Cansel",
          {
            text: "Supprimer",
            handler: () => onDelete(),
          },
        ]}
      />
    </>
  );
}
