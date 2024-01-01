import {Kafka, Partitioners} from "kafkajs";

interface MessageFormat {
    key: string
    value: string
}
async function run(): Promise<void> {

    const kafka = new Kafka({
        brokers: ["localhost:9092"],
        clientId: "example-producer"
    });

    const producer = kafka.producer({
        createPartitioner: Partitioners.DefaultPartitioner
    });

    await producer.connect();

    let messages: Array<MessageFormat> = [];

    for (let i: number = 0; i < 10; i++) {
        messages.push({
            "key": `${i}`,
            "value": `Message ${i}`
        })
    }

    await producer.send({
        topic: "example-topic",
        messages: messages
    });

    await producer.disconnect();
}

run().catch((error) => console.error(error));

